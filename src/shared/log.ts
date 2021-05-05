import * as colors from "fmt/colors.ts";

const { yellow, red, green, blue } = colors;

export interface HelpCommandParams {
  command: {
    alias: string[];
    description: string;
  };
  flags: Array<{
    description: string;
    alias: string[];
  }>;
}

export interface CommandNotFoundParams {
  commands: string[];
  flags: string[];
}

export function CommandNotFound({ commands, flags }: CommandNotFoundParams) {
  const { args } = Deno;

  const [command = "", flag = ""] = args;

  if (!commands.includes(command)) {
    console.log(
      red("Command not found:\n"),

      green(
        `\n${red("snel")} ${yellow(
          command ?? "empty command"
        )}: unknown command\n`
      ),

      green(
        `\nuse ${red("snel")} ${yellow("--help")} to see available commands\n`
      )
    );

    console.log(didYouMean(command, commands));

    Deno.exit(0);
  }

  if (!flags.includes(flag)) {
    console.log(
      red("Command flag not found:\n"),

      green(
        `\n${red("snel")} ${yellow(command ?? "empty command")}  ${yellow(
          flag
        )}: unknown command flag\n`
      ),

      green(
        `\nuse ${red("snel")} ${yellow(command ?? "empty command")} ${yellow(
          "--help"
        )} to see available command flags\n`
      )
    );

    console.log(didYouMean(flag, flags, command));

    Deno.exit(0);
  }
}

export function HelpCommand({ command, flags }: HelpCommandParams) {
  console.log(
    green(`${red("action: ")} ${command.description}\n`),

    yellow("\nuse:\n"),

    green(
      `snel [${command.alias.map((cmd) => yellow(cmd))}]  ${flags.map((flag) =>
        `[${flag.alias.map((name) => yellow(name))}]`.replace(",", ", ")
      )}\n`.replace(",", " or ")
    ),

    yellow(flags.length ? "\nflags:\n" : ""),

    green(
      `${flags.map(
        (flag) =>
          ` ${red("*")} [${flag.alias.map((sub) => yellow(sub))}] : ${
            flag.description
          }\n`
      )}`.replaceAll(",", " ")
    )
  );
}

export const leven = (left: string, right: string) => {
  const array: any[] = [];
  const charCodeCache: any[] = [];

  if (left === right) {
    return 0;
  }

  const swap = left;

  if (left.length > right.length) {
    left = right;
    right = swap;
  }

  let leftLength = left.length;
  let rightLength = right.length;

  while (
    leftLength > 0 &&
    left.charCodeAt(~-leftLength) === right.charCodeAt(~-rightLength)
  ) {
    leftLength--;
    rightLength--;
  }

  let start = 0;

  while (
    start < leftLength &&
    left.charCodeAt(start) === right.charCodeAt(start)
  ) {
    start++;
  }

  leftLength -= start;
  rightLength -= start;

  if (leftLength === 0) {
    return rightLength;
  }

  let bCharCode;
  let result;
  let temp;
  let temp2;
  let i = 0;
  let j = 0;

  while (i < leftLength) {
    charCodeCache[i] = left.charCodeAt(start + i);
    array[i] = ++i;
  }

  while (j < rightLength) {
    bCharCode = right.charCodeAt(start + j);
    temp = j++;
    result = j;

    for (i = 0; i < leftLength; i++) {
      temp2 = bCharCode === charCodeCache[i] ? temp : temp + 1;
      temp = array[i];

      result = array[i] =
        temp > result
          ? temp2 > result
            ? result + 1
            : temp2
          : temp2 > temp
          ? temp + 1
          : temp2;
    }
  }

  return result;
};

/**
 * show spell suggestion
 * @param word
 * @param commands
 * @param command
 */
export const didYouMean = (word: string, commands: string[], command = "") => {
  const best = commands
    .filter((cmd) => leven(word, cmd) < word.length * 0.4)
    .map((str) => green(` snel ${yellow(command)} ${blue(str)}`));
  return best.length === 0
    ? ""
    : best.length === 1
    ? `\n ${yellow("Did you mean this?")}\n\n${best[0]}`
    : `\nDid you mean one of these?\n${best.slice(0, 3).join("\n")}\n`;
};
