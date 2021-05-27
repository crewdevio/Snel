/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { CreateProjectOptions } from "../shared/types.ts";
import { colors } from "../../imports/fmt.ts";

const isNumber = (n: string) => parseInt(n);

function validate(
  fields: string[],
  field: string,
  question: string,
  type: "number" | "string"
): string | number {

  if (type === "number" && isNumber(field)) return parseInt(field);

  else if (fields.includes(field)) return field.trim().toLowerCase();

  else {
    console.log(
      type === "string"
        ? colors.red(`\nthis field is no valid, these are valid "${fields.join(", ")}"\n`)
        : colors.red("\nis not a valid number\n")
    );

    return validate(fields, prompt(colors.green(question))!, question, type);
  }
}

export function PromptConfig(count = 0): Omit<CreateProjectOptions, "projectName"> {
  const answers: { [key: string]: string | number } = {};

  const questions = [
    {
      name: "root",
      message: "what do you want the main component file to be called?",
      _default: "App",
    },
    {
      name: "port",
      message: "which port do you want the development server to run on?",
      _default: "3000",
    },
    {
      name: "mode",
      message: "What kind of project do you want to do? (ssg, dom)",
      _default: "dom"
    }
  ];

  for (const { message, name, _default } of questions) {
    switch (name) {
      case "root":
        answers[name] = prompt(colors.green(message), _default)!;
        break;
      case "port":
        answers[name] = validate([], prompt(colors.green(message), _default)!, message, "number");
        break;
      case "mode":
        answers[name] = validate(["dom", "ssg"], prompt(colors.green(message), _default)!, message, "string");
        break;
    }
  }

  for (const answer in answers) console.log(colors.green(`\n${answer}: ${answers[answer]}`));

  const accept = confirm(colors.yellow("\nthis is the final configuration"));

  if (accept) return answers as Omit<CreateProjectOptions, "projectName">;

  return count <= 1 ? PromptConfig(count + 1) : Deno.exit(0);
}

export function notFoundConfig() {
  throw new Error(
    colors.red(`${colors.yellow("snel config")} file could not be found`)
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
