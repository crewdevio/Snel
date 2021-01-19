/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { colors } from "../../imports/fmt.ts";

export function PromptConfig(): { [key: string]: string } {
  const answer: { [key: string]: string } = {};

  const questions = [
    {
      name: "root",
      message: "what do you want the main file to be called?",
      default: "App",
    },
    {
      name: "port",
      message: "which port do you want the development server to run on?",
      default: "3000",
    },
    {
      name: "buildDir",
      message: "in which directory do you want your app to be compiled for production?",
      default: "dist",
    },
  ];

  for (const question of questions) {
    answer[question.name] = prompt(
      colors.green(question.message),
      question.default
    )!;
  }

  console.log(answer);
  if (confirm(colors.yellow("\nthis is the final configuration"))) {
    return answer;
  } else {
    return PromptConfig();
  }
}
