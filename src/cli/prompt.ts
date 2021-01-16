/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  prompt,
  Input,
  Number,
  Confirm,
  Checkbox,
} from "../../imports/prompt.ts";

export async function PromptConfig() {
  return await prompt([
    {
      name: "projectName",
      message: "what do you want the project to be called?",
      type: Input,
    },
    {
      name: "serverPort",
      message: "which port do you want the development server to run on?",
      type: Number,
    },
  ]);
}
