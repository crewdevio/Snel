/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { CommandNotFound, HelpCommand } from "./src/shared/log.ts";
import { VERSION as cliVersion } from "./src/shared/version.ts";
import { flags, keyWords } from "./src/shared/utils.ts";
import { CreateProject } from "./src/cli/create.ts";
import { PromptConfig } from "./src/cli/prompt.ts";
import { showHelp } from "./src/shared/utils.ts";
import { colors } from "./imports/fmt.ts";

const { args: Args } = Deno;
type Command = "create";
const command = Args[0] as Command;

const instructs = {
  // create a template project
  async create() {
    if (flags.help.includes(Args[1])) {
      return HelpCommand({
        command: {
          alias: [keyWords.create],
          description: "create a template project",
        },
        flags: [{ alias: flags.help, description: "show command help" }],
      });
    } else await CreateProject({ ...PromptConfig(), projectName: Args[1] });
  },
};

async function Main() {
  try {
    // execute instructions
    if (command === "create") {
      return await instructs.create();
    }

    // show version
    else if (flags.version.includes(Args[0])) {
      console.log(
        colors.green(
          `snel: ${colors.yellow(cliVersion)}\ndeno: ${colors.yellow(
            Deno.version.deno
          )}`
        )
      );
    }
    // show help
    else if (flags.help.includes(Args[0]) || !Args[0]) {
      showHelp();
    } else {
      CommandNotFound({
        commands: [
          keyWords.create,
        ],
        flags: [...flags.help, ...flags.version],
      });
    }
  } catch (error: any) {
    if (!(error instanceof Deno.errors.NotFound)) {
      console.log(error);
    }
  }
}

if (import.meta.main) {
  await Main();
}
