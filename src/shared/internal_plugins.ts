/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { loadConfig, resolverConfigFile } from "./utils.ts";
import type { snelConfig } from "../shared/types.ts";
import server from "../dev_server/server.ts";

export { terser } from "https://denopkg.com/buttercubz/deno-rollup@next/plugins/terser/mod.ts";
export { default as Svelte } from "./bundler.js";
export * from "./import_map.ts";

export async function DevServer(ipv4?: string) {
  const { port, mode } = await loadConfig<snelConfig>(
    await resolverConfigFile()
  )!;

  if (mode === "dom") {
    try {
      return server({
        contentBase: "public",
        port,
        host: "0.0.0.0",
        verbose: false,
        historyApiFallback: true,
        ipv4,
      });
    } catch (error) {
      if (!(error instanceof Deno.errors.AddrInUse)) {
        console.log(error);
      }
    }
  }
}
