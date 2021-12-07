/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { loadConfig, common, resolverConfigFile } from "../../shared/utils.ts";
import { serverTemplate } from "../../server_side/templates.ts";
import { RollupBuild } from "../../../compiler/build.ts";
import type { snelConfig } from "../../shared/types.ts";
import { Server } from "../../server_side/server.ts";
import { encoder } from "../../shared/encoder.ts";
import { colors } from "../../../imports/fmt.ts";
import { Dist } from "../prepare.ts";

export default async function Build() {
  console.log(colors.green("preparing files for production.\n"));
  const { mode, plugins, port } = await loadConfig<snelConfig>(
    await resolverConfigFile()
  )!;

  if (mode === "dom") {
    await RollupBuild({
      dir: common.dom.dir,
      entryFile: common.entryFile,
      production: true,
      generate: mode,
      plugins,
    });

    await Dist();
  }

  if (mode === "ssg") {
    await RollupBuild({
      dir: common.ssg.dir,
      entryFile: common.entryFile,
      production: true,
      generate: mode,
      plugins,
    });

    const ServerFile = await Deno.create(`${common.ssg.dir}/Server.js`);
    const ServerCode = serverTemplate(
      Server.toString(),
      common.ssg.serverFile,
      null,
      "ssg",
      port
    );

    await ServerFile.write(encoder.encode(ServerCode));
    Deno.close(ServerFile.rid);

    console.log(colors.green("build done."));
  }

  Deno.exit(0);
}
