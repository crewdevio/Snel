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
import type { RollupOptions, OutputOptions } from "../imports/drollup.ts";
import type { RollupBuildProps } from "./types.ts";
import { toFileUrl } from "../imports/path.ts";
import { rollup } from "../imports/drollup.ts";

export async function RollupBuild({
  dir = "./public/dist",
  entryFile = "./src/main.js",
  generate = "dom",
  plugins = [],
  production = false,
  ipv4,
}: RollupBuildProps) {
  const base = toFileUrl(Deno.cwd()).href;

  generate = generate === "ssg" || generate === "ssr" ? "ssr" : "dom";

  const defaults = production
    ? [
        ImportMapPlugin({
          maps: "./import_map.json",
        }),
        ...plugins,
        Svelte({ generate }),
        postcss(),
        terser(),
      ]
    : [
        ImportMapPlugin({
          maps: "./import_map.json",
        }),
        ...plugins,
        (await DevServer(ipv4))!,
        Svelte({ generate, dev: true }),
        postcss(),
      ];

  const options: RollupOptions = {
    input: new URL(entryFile, `${base}/`).href,
    plugins: [...defaults],
    output: {
      dir,
      format: "es" as const,
      sourcemap: !production,
    },
  };

  const bundle = await rollup(options);
  await bundle.write(options.output as OutputOptions);
  await bundle.close();
}
