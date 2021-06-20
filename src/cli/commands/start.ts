/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { loadConfig, common, ipv4, open, resolverConfigFile } from "../../shared/utils.ts";
import { HotReload } from "../../dev_server/hotReloading.ts";
import { exists, existsSync } from "../../../imports/fs.ts";
import { RollupBuild } from "../../../compiler/build.ts";
import { DevServer } from "../../server_side/server.ts";
import type { snelConfig } from "../../shared/types.ts";
import { colors } from "../../../imports/fmt.ts";
import { serverLog } from "../prompt.ts";

export default async function StartDev() {
  const { port, mode, plugins } = await loadConfig<snelConfig>(await resolverConfigFile())!;

  console.log(colors.bold(colors.cyan("starting development server.")));

  const outDir = mode === "dom" ? common.dom.dir : common.ssg.dir;

  const dirName = Deno.cwd()
    .split(Deno.build.os === "windows" ? "\\" : "/")
    .pop()!;

  const { str: ip, ipv4: ipV4 } = await ipv4(port);
  const localNet = ip
    ? `${colors.bold("On Your Network:")}  ${ip}:${colors.bold(port.toString())}`
    : "";

  await RollupBuild({
    entryFile: common.entryFile,
    production: false,
    dir: outDir,
    generate: mode,
    plugins,
    ipv4: ipV4!,
  });

  if (mode === "ssg" || mode === "ssr") {
    // SSG/SSR development server
    await DevServer({
      path: common.ssg.serverFile,
      clientPath: null,
      mode: "ssg",
      port: port,
      entryFile: common.entryFile,
      outDir,
      plugins,
      dirName,
      localNet,
      ipv4: ipV4!,
    });
  }

  // run dev server in localhost and network in dom mode
  if (mode === "dom") {
    // server logs
    serverLog({ port, dirName, localNet });
    // open in browser
    setTimeout(async () => await open(`http://localhost:${port}`), 500);

    let toWatch: string[] = ["./src", "./public/index.html", "./public/global.css"];

    type Run = { scripts: { [key: string]: string }, files?: string[] };

    if (await exists("./run.json")) {
      try {
        const run = JSON.parse(await Deno.readTextFile("./run.json")) as Run;

        if (run?.files && run.files.length > 0) {
          toWatch = run.files?.filter((file) => existsSync(file));
        }
      } catch (e) {/* do nothing  */}
    }

    // hot reloading
    await HotReload(toWatch, (port + 1), async () => {
      await RollupBuild({
        entryFile: common.entryFile,
        production: false,
        dir: outDir,
        generate: mode,
        plugins,
        ipv4: ipV4!,
      });
    });
  }
}
