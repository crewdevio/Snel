/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { colors } from "../../imports/fmt.ts";
import type { CreateProjectOptions } from "../shared/types.ts";

export function PromptConfig(): Omit<CreateProjectOptions, "projectName"> {
  const answers: { [key: string]: string } = {};

  const questions = [
    {
      name: "root",
      message: "what do you want the main component file to be called?",
      default: "App",
    },
    {
      name: "port",
      message: "which port do you want the development server to run on?",
      default: "3000",
    },
    {
      name: "mode",
      message: "What kind of project do you want to do? (ssg, dom)",
      default: "dom"
    }
  ];

  for (const question of questions) {
    answers[question.name] = prompt(
      colors.green(question.message),
      question.default
    )!;
  }

  for (const answer in answers) {
    console.log(colors.green(`\n${answer}: ${answers[answer]}`));
  }

  if (confirm(colors.yellow("\nthis is the final configuration"))) {
    return answers as Omit<CreateProjectOptions, "projectName">;
  } else {
    return PromptConfig();
  }
}

export function notFoundConfig() {
  throw new Error(
    colors.red(`${colors.yellow("snel.config.json")} file could not be found`)
  ).message;
}

export function serverLog({ dirName, port, localNet }: any) {
  console.clear();
  console.log(`
  ${colors.green("Compiled successfully!")}

  You can now view ${colors.bold(colors.yellow(dirName))} in the browser.

      ${colors.bold("Local:")}            http://localhost:${colors.bold(port.toString())}
      ${localNet}

  Note that the development build is not optimized.
  To create a production build, use ${colors.bold(colors.blue("trex run build"))}.
  `);
}
