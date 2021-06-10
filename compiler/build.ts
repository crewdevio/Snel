/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  terser,
  ImportMapPlugin,
  Svelte,
  DevServer,
  postcss,
} from "../src/shared/internal_plugins.ts";
import type { RollupBuildProps } from "./types.ts";
import { toFileUrl } from "../imports/path.ts";
import { rollup } from "../imports/drollup.ts";

export async function RollupBuild({
  dir = "./public/dist",
  entryFile = "./src/main.js",
  generate = "dom",
  plugins = [],
  production = false,
}: RollupBuildProps) {
  const base = toFileUrl(Deno.cwd()).href;

  generate = generate === "ssg" || generate === "ssr" ? "ssr" : "dom";

  const defaults = production
    ? [
        ImportMapPlugin({
          maps: "./import_map.json",
        }),
        ...plugins,
        (await DevServer())!,
        Svelte({ generate }),
        postcss(),
        terser(),
      ]
    : [
        ImportMapPlugin({
          maps: "./import_map.json",
        }),
        ...plugins,
        (await DevServer())!,
        Svelte({ generate }),
        postcss(),
      ];

  const options = {
    input: new URL(entryFile, `${base}/`).href,
    plugins: [...defaults],
    output: {
      dir,
      format: "es" as const,
      sourcemap: true,
    },
  };

  const bundle = await rollup(options);
  await bundle.write(options.output);
  await bundle.close();
}
