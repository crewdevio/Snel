/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Command } from "../../imports/command.ts";
import type { ICommandOption } from "../../imports/command.ts";
import { PromptConfig } from "./prompt.ts";
import { createDir, createFile } from "./io.ts";
import { VERSION } from "../shared/version.ts";

async function Create(options: ICommandOption, ...args: string[]) {
  console.log({ options, args });
}

export const create = new Command()
  .version(VERSION)
  .description("create a template project")
  .arguments("[options...:string]")
  .useRawArgs()
  .action(Create);
