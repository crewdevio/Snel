/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { HelpCommand, CommandNotFound } from "./src/shared/log.ts";
import { PromptConfig, notFoundConfig } from "./src/cli/prompt.ts";
import { VERSION as svelteVersion } from "./compiler/compiler.ts";
import { VERSION as cliVersion } from "./src/shared/version.ts";
import { showHelp, common } from "./src/shared/utils.ts";
import { flags, keyWords } from "./src/shared/utils.ts";
import { CreateProject } from "./src/cli/create.ts";
import StartDev from "./src/cli/commands/start.ts";
import { RollupBuild } from "./compiler/build.ts";
import Build from "./src/cli/commands/build.ts";
import * as colors from "fmt/colors.ts";
import { resolve } from "path/mod.ts";
import { exists } from "fs/mod.ts";

async function Main() {
  const { args } = Deno;

  try {
    // create a template project
    if (args[0] === keyWords.create) {
      if (flags.help.includes(args[1])) {
        return HelpCommand({
          command: {
            alias: [keyWords.create],
            description: "create a template project",
          },
          flags: [{ alias: flags.help, description: "show command help" }],
        });
      }

      else {
        await CreateProject({ ...PromptConfig(), projectName: Deno.args[1] });
      }
    }
    // compile an bundle for production
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

      else if (await exists(resolve("snel.config.js"))) await Build();

      else notFoundConfig();
    }
    // compile in dev mode
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

      else if (await exists(resolve("snel.config.js"))) {
        console.time(colors.green("Compiled successfully in"));
        await RollupBuild({ dir: common.dom.dir, entryFile: common.entryFile });
        console.timeEnd(colors.green("Compiled successfully in"));
      }

      else {
        notFoundConfig();
      }
    }
    // start dev server
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

      else if (await exists(resolve("snel.config.js"))) {
        await StartDev();
      }

      else {
        notFoundConfig();
      }
    }
    // show version
    else if (flags.version.includes(args[0])) {
      console.log(
        colors.green(
          `snel: ${colors.yellow(cliVersion)}\nsvelte: ${colors.yellow(
            svelteVersion
          )}`
        )
      );
    }
    // show help
    else if (flags.help.includes(args[0])) {
      showHelp();
    }

    else {
      CommandNotFound({
        commands: [
          keyWords.build,
          keyWords.create,
          keyWords.dev,
          keyWords.serve,
        ],
        flags: [...flags.help, ...flags.version],
      });
    }
  } catch (error: any) {
    if (!(error instanceof Deno.errors.NotFound)) {
      console.log(colors.red(error?.message));
      console.log(error.stack);
    }
  }
}

if (import.meta.main) {
  await Main();
}
