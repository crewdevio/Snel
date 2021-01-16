/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { VERSION } from "../src/shared/version.ts";
import { resolve } from "../imports/path.ts";
import { colors } from "../imports/fmt.ts";
import { build } from "./build.ts";

const help = () =>
  console.log(
    `Svelte compiler\n\ncompile .svelte file to javascript\n\nusage:\n  svlc ./App.svelte\n\ncommands:\n  -h --help\n  -v --version\n`
  );

async function main() {
  const { args } = Deno;

  if (["help", "-h", "--help"].includes(args[0])) {
    help();
  }
  // show version
  else if (["version", "-v", "--version"].includes(args[0])) {
    console.log(VERSION);
  }

  // transpile to js
  else {
    if (!args[0].endsWith(".svelte")) {
      throw new EvalError(
        colors.red(
          `only ${colors.yellow(".svelte")} files are allowed to compile`
        )
      ).message;
    }

    // compile file
    if (args[0]) await build(resolve(Deno.cwd(), args[0]), true);
    else help();
  }
}

if (import.meta.main) {
  await main();
}
