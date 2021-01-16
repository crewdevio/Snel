/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Command } from "./imports/command.ts";
import { PromptConfig } from "./src/cli/prompt.ts";
import { VERSION } from "./src/shared/version.ts";
import { create } from "./src/cli/create.ts";

const snel = new Command()
  .throwErrors()
  .name("Snel")
  .version(VERSION)
  .description("A Cybernetically compiler for web applications")
  .action(() => {
    console.log("help ....");
  })
  .command("create", create);
