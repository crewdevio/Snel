/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { PromptConfig, notFoundConfig, serverLog } from "./src/cli/prompt.ts";
import { flags, keyWords, open, getIP } from "./shared/utils.ts";
import { HelpCommand, CommandNotFound } from "./shared/log.ts";
import { HotReload } from "./src/dev-server/hotReloading.ts";
import type { snelConfig } from "./src/shared/types.ts";
import { CreateProject } from "./src/cli/create.ts";
import server from "./src/dev-server/server.ts";
import { readJson } from "./imports/jsonio.ts";
import { build } from "./compiler/build.ts";
import { resolve } from "./imports/path.ts";
import { colors } from "./imports/fmt.ts";
import { exists } from "./imports/fs.ts";

async function Main() {
  const { args } = Deno;

  if (args[0] === keyWords.create) {
    if (flags.help.includes(args[1])) {
      return HelpCommand({
        command: {
          alias: [`${keyWords.create} App`],
          description: "create a template project",
        },
        flags: [{ alias: flags.help, description: "show command help" }],
      });
    }

    else {
      await CreateProject({ ...PromptConfig(), projectName: Deno.args[1] });
    }
  }

  else if (args[0] === keyWords.build) {
    if (flags.help.includes(args[1])) {
      return HelpCommand({
        command: {
          alias: [keyWords.build],
          description: "build application for production",
        },
        flags: [{ alias: flags.help, description: "show command help" }],
      });
    }

    else if (await exists(resolve("snel.config.json"))) {
      const { root, buildDir } = (await readJson(
        "./snel.config.json"
      )) as snelConfig;

      await build(root, { dev: false, isRoot: true, outDir: `./${buildDir}/` });
    }

    else {
      notFoundConfig();
    }
  }

  else if (args[0] === keyWords.dev) {
    if (flags.help.includes(args[1])) {
      return HelpCommand({
        command: {
          alias: [keyWords.build],
          description: "build application in dev mode",
        },
        flags: [{ alias: flags.help, description: "show command help" }],
      });
    }

    else if (await exists(resolve("snel.config.json"))) {
      const { root } = (await readJson("./snel.config.json")) as snelConfig;

      console.time(colors.green("Compiled successfully in"));
      await build(root, {
        isRoot: true,
        outDir: "./public/build/",
      });
      console.timeEnd(colors.green("Compiled successfully in"));
    }

    else {
      notFoundConfig();
    }
  }

  else if (args[0] === keyWords.serve) {
    if (flags.help.includes(args[1])) {
      return HelpCommand({
        command: {
          alias: [keyWords.serve],
          description: "build and server in a dev server",
        },
        flags: [{ alias: flags.help, description: "show command help" }],
      });
    }

    else if (await exists(resolve("snel.config.json"))) {
      const { root, port } = (await readJson(
        "./snel.config.json"
      )) as snelConfig;

      await build(root, {
        isRoot: true,
        outDir: "./public/build/",
        dev: true,
      });

      // run dev server in localhost
      server(parseInt(port), "./public");
      /// run  dev server in network
      server(parseInt(port), "./public", true);

      const dirName = Deno.cwd()
        .split(Deno.build.os === "windows" ? "\\" : "/")
        .pop()!;

      const isWindow = Deno.build.os === "windows";

      const localNet =
        (await getIP()) && isWindow
          ? `${colors.bold(
              "On Your Network:"
            )}  http://${await getIP()}:${colors.bold(port)}`
          : "";

      // server logs
      serverLog({ port, dirName, localNet });
      // open in browser
      setTimeout(async () => await open(`http://localhost:${port}`), 500);

      // hot reloading
      await HotReload("./src", parseInt(port) + 1, async () => {
        await build(root, {
          isRoot: true,
          outDir: "./public/build/",
          dev: true,
        });
      });
    }

    else {
      notFoundConfig();
    }
  }

  else {
    CommandNotFound({
      commands: [keyWords.build, keyWords.create, keyWords.dev, keyWords.serve],
      flags: [...flags.help, ...flags.version],
    });
  }
}

if (import.meta.main) {
  await Main();
}
