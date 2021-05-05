/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { loadConfig, common } from "../../shared/utils.ts";
import { serverTemplate } from "../../server_side/templates.ts";
import { RollupBuild } from "../../../compiler/build.ts";
import type { snelConfig } from "../../shared/types.ts";
import { Server } from "../../server_side/server.ts";
import { encoder } from "../../shared/encoder.ts";
import * as colors from "fmt/colors.ts";
import { Dist } from "../prepare.ts";

export default async function Build() {
  console.log(colors.green("preparing files for production.\n"));
  const { root, mode, plugins, port } = await loadConfig<snelConfig>(
    "./snel.config.js"
  )!;


  if (mode === "dom") {
    await RollupBuild({
      dir: common.dom.dir,
      entryFile: common.entryFile,
      generate: mode,
      plugins,
    });

    await Dist(root);
  }

  if (mode === "ssg") {
    const ServerFile = await Deno.create(`${common.ssg.dir}/Server.js`);
    const ServerCode = serverTemplate(
      Server.toString(),
      common.ssg.serverFile,
      null,
      "ssg",
      Number(port)
    );

    ServerFile.write(encoder.encode(ServerCode));
  }

  console.log(colors.green("\nbuild done."));
}
