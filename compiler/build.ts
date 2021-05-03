/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ImportMapPlugin } from "../src/shared/import_map.ts";
import SVELTECOMPILER from "../src/shared/bundler.js";
import type { RollupBuildProps } from "./types.ts";
import { toFileUrl } from "../imports/path.ts";
import { rollup } from "../imports/drollup.ts";

export async function RollupBuild({
  dir = "./public/dist",
  entryFile = "./src/main.js",
  generate = "dom",
  plugins = [],
}: RollupBuildProps) {
  const base = toFileUrl(Deno.cwd()).href;

  generate = (generate === "ssg" || generate === "ssr") ? "ssr" : "dom";

  const options = {
    input: new URL(entryFile, `${base}/`).href,
    plugins: [
      ImportMapPlugin({
        maps: "./import_map.json",
      }),
      ...plugins,
      SVELTECOMPILER({ generate }),
    ],
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
