import { compile, preprocess } from "../../compiler/compiler.ts";
import { compile as scssCompiler } from "../../imports/scss.ts";
import { importToUrl, mapPattern } from "../../shared/utils.ts";
import { createFilter } from "../../imports/drollup-util.ts";
import { tsTranspiler } from "../shared/transpiler.ts";
import { URL_SVELTE_CDN } from "../shared/version.ts";
import * as path from "../../imports/path.ts";
import { less } from "../../imports/less.ts";

export default (options = {}) => {
  const { compilerOptions = {}, ...rest } = options;
  const extensions = rest.extensions || [".svelte"];
  const filter = createFilter(rest.include, rest.exclude);

  compilerOptions.format = "esm";

  // [filename]:[chunk]
  const cache_emit = new Map();

  return {
    name: "svelte",

    /**
     * Resolve an import's full filepath.
     */
    resolveId(importee, importer) {
      if (cache_emit.has(importee)) return importee;
      if (
        !importer ||
        importee[0] === "." ||
        importee[0] === "\0" ||
        path.isAbsolute(importee)
      )
        return null;

      // if this is a bare import, see if there's a valid pkg.svelte
      const parts = importee.split("/");

      let dir,
        pkg,
        name = parts.shift();
      if (name && name[0] === "@") {
        name += `/${parts.shift()}`;
      }

      // use pkg.svelte
      if (parts.length === 0 && pkg.svelte) {
        return path.resolve(dir, pkg.svelte);
      }
    },

    /**
     * Returns CSS contents for a file, if ours
     */
    load(id) {
      return cache_emit.get(id) || null;
    },

    /**
     * Transforms a `.svelte` file into a `.js` file.
     * NOTE: If `emitCss`, append static `import` to virtual CSS file.
     */
    async transform(code, id) {
      if (!filter(id)) return null;

      const extension = path.extname(id);
      if (!~extensions.indexOf(extension)) return null;

      const dependencies = [];
      const filename = path.relative(Deno.cwd(), id);
      const svelte_options = { ...compilerOptions, filename };

      const processed = await preprocess(
        code,
        {
          async script({ content, attributes, filename }) {
            let code = content;
            // transpile to javascript
            if (attributes?.lang === "ts") {
              code = await tsTranspiler(code, filename ?? "");
            }
            // resolve import map calls
            code = importToUrl(content, mapPattern, "map:");

            return {
              code,
            };
          },
          async style({ attributes, filename, content }) {
            let css = null;

            try {
              // transform scss to css
              if (attributes?.lang === "scss") {
                css = scssCompiler(content);
              }

              // transform less  to css
              else if (attributes?.lang === "less") {
                const { css: code } = await less.render(content);
                css = code;
              }
            } catch (error) {
              throw new Error(
                colors.red(`compiling to css ${colors.yellow(filename)}`)
              ).message;
            }

            return {
              code: css ?? content,
            };
          },
        },

        { filename }
      );

      if (processed.dependencies) {
        dependencies.push(...processed.dependencies);
      }

      if (processed.map) {
        svelte_options.sourcemap = processed.map;
      }
      code = processed.code;

      const compiled = compile(code, {
        filename: filename,
        generate: "dom",
        dev: true,
        sveltePath: URL_SVELTE_CDN,
        hydratable: true,
      });

      if (this.addWatchFile) {
        dependencies.forEach(this.addWatchFile);
      } else {
        compiled.js.dependencies = dependencies;
      }

      return compiled.js;
    },
  };
};
