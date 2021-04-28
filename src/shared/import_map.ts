/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Derived from <https://github.com/trygve-lie/rollup-plugin-import-map>
 *
 * Licensed as follows:
 *
 * MIT License
 *
 * Copyright (c) 2020 Trygve Lie
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { dirname, fromFileUrl, normalize, relative } from "../../imports/path.ts";
import type { NormalizedInputOptions, Plugin } from "../../imports/drollup.ts";
import { ensureArray } from "./imports/ensureArray.ts";
import { VERSION, URL_SVELTE_CDN } from "./version.ts";
import { resolveId } from "./imports/resolveId.ts";
import { exists } from "../../imports/fs.ts";

/**
 * @public
 */
export interface ImportMapObject {
  imports: Record<string, string>;
  scopes?: Record<string, Record<string, string>>;
}

/**
 * @public
 */
export type ImportMapPath = string;

/**
 * @public
 */
export type ImportMap = ImportMapObject | ImportMapPath;

/**
 * @public
 */
export interface RollupImportMapOptions {
  /**
   * A path to an import map, an inline import map object, or an
   * array containing any combination of the above.
   * @default []
   */
  maps?: ImportMap | ImportMap[];
  /**
   * If `true`, instructs Rollup to mark imports declared in the
   * provided import maps as external. If `false` the imports
   * are bundled. If not specified it will default to `false`.
   * @default false
   */
  external?: boolean;
  /**
   * Set the base url from which the relative-URL-like addresses
   * are resolved.
   *
   * If not provided, the base url will the location of the import
   * map if an import map path is provided, or the current working
   * directory if not.
   */
  baseUrl?: string;
}

/**
 * isBareImportSpecifier
 *
 * @param {string} address
 * @returns {boolean}
 * @private
 */
const isBareImportSpecifier = (address: string) => {
  if (
    address.startsWith("/") ||
    address.startsWith("./") ||
    address.startsWith("../") ||
    address.startsWith("http://") ||
    address.startsWith("https://") ||
    address.startsWith("file://") ||
    address.startsWith("C:\\")
  ) {
    return false;
  }

  return true;
};

/**
 * validate
 *
 * @param {ImportMapObject} importMap
 * @param {NormalizedInputOptions} options
 * @private
 */
const validate = (
  importMap: ImportMapObject,
  options: NormalizedInputOptions,
  baseUrl: string
) =>
  Object.keys(importMap.imports).map((specifier) => {
    const address = importMap.imports[specifier];

    if (isBareImportSpecifier(address)) {
      throw new TypeError(
        `import specifier "${specifier}" can not be mapped to a bare import statement "${address}".`
      );
    }

    if (typeof options.external === "function") {
      if (options.external(specifier, undefined, false)) {
        throw new TypeError(
          "import specifier must not be present in the Rollup external config"
        );
      }
    }
    if (Array.isArray(options.external)) {
      if (options.external.includes(specifier)) {
        throw new TypeError(
          "import specifier must not be present in the Rollup external config"
        );
      }
    }

    return { specifier, address, baseUrl };
  });

/**
 * readFile
 *
 * @param {string} pathname
 * @param options
 * @private
 */
const readFile = async (
  path: string,
  options: NormalizedInputOptions,
  baseUrl?: string
) => {
  const defaultImports = {
    "snel": `https://deno.land/x/snel@v${VERSION}/mod.ts`,
    "snel/": `https://deno.land/x/snel@v${VERSION}/`,
    "snel/core/": `https://deno.land/x/snel@v${VERSION}/core/`,
    "snel/router/": `https://deno.land/x/snel@v${VERSION}/core/router/mod.ts`,
    "snel/router": `https://deno.land/x/snel@v${VERSION}/core/router/`,
    "snel/utils/": `https://deno.land/x/snel@v${VERSION}/core/utils/`,
    "snel/utils": `https://deno.land/x/snel@v${VERSION}/core/utils/mod.ts`,
    "svelte": URL_SVELTE_CDN,
    "svelte/": `${URL_SVELTE_CDN}/`,
    "@/": "./",
    "/": "./",
  };

  const importMapPath = normalize(path);
  const importMapFile = (await exists("./import_map.json"))
    ? await Deno.readTextFile(importMapPath)
    : JSON.stringify({
        imports: { ...defaultImports },
        scopes: {},
      });

  const { imports, scopes } = JSON.parse(importMapFile);
  const importsFallback = imports ?? {};
  const scopesFallback = scopes ?? {};

  const importMap = {
    imports: {
      ...defaultImports,
      ...importsFallback,
    },
    scopes: scopesFallback,
  };

  return validate(importMap, options, baseUrl ?? dirname(importMapPath));
};

/**
 * rollupImportMapPlugin
 *
 * Apply [import map](https://github.com/WICG/import-maps)
 * mappings to ES modules.
 *
 * @param {RollupImportMapOptions} rollupImportMapOptions
 * @returns {Plugin}
 * @public
 */
export function ImportMapPlugin(
  rollupImportMapOptions: RollupImportMapOptions
): Plugin {
  const cache = new Map();
  const cwd = Deno.cwd();
  const importMaps = ensureArray(rollupImportMapOptions.maps);

  function getAddress(source: string, importer?: string) {
    for (const [specifier, { address, baseUrl }] of cache.entries()) {
      let base = baseUrl;

      if (importer) {
        if (importer.startsWith("file://")) {
          base = relative(fromFileUrl(importer), baseUrl);
        } else {
          base = relative(importer, baseUrl);
        }
      }

      const resolvedAddress = resolveId(address, base);

      if (specifier === source) {
        return resolvedAddress;
      } else if (specifier.endsWith("/") && source.startsWith(specifier)) {
        const suffix = source.slice(specifier.length);

        return resolveId(suffix, resolvedAddress);
      }
    }

    return null;
  }

  return {
    name: "rollup-plugin-import-map",

    async buildStart(options) {
      const mappings = await Promise.all(
        importMaps.map((importMap) => {
          if (typeof importMap === "string") {
            return readFile(importMap, options, rollupImportMapOptions.baseUrl);
          }

          return validate(
            importMap,
            options,
            rollupImportMapOptions.baseUrl ?? cwd
          );
        })
      );

      mappings.forEach((map) => {
        map.forEach(({ specifier, address, baseUrl }) => {
          cache.set(specifier, { address, baseUrl });
        });
      });
    },

    async resolveId(source, importer) {
      const address = getAddress(source, importer);

      if (address) {
        return {
          id: resolveId(address, importer),
          external: rollupImportMapOptions.external ?? false,
        };
      }

      return null;
    },
  };
}
