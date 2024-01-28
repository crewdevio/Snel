/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { colors } from "../../imports/fmt.ts";

export const flags = {
  help: ["--help", "-h"],
  version: ["-v", "--version"],
};

export function showHelp() {
  console.log(
    colors.green(
      `A Cybernetical tool for svelte applications on deno

USAGE:
  ${colors.white("snel")} ${colors.yellow("[SUBCOMMAND] [OPTIONS]")}

OPTIONS:
  ${colors.yellow("-h, --help")}      ${colors.white("print help info")}
  ${colors.yellow("-v, --version")}   ${colors.white("print version")}

SUBCOMMANDS:
  ${colors.yellow("create")}    ${colors.white("create a template project")}
  ${colors.yellow("dev")}       ${colors.white("build application in dev mode")}
  ${colors.yellow("serve")}     ${colors.white(
        "build and server in a dev server"
      )}
  ${colors.yellow("build")}     ${colors.white(
        "build application for production"
      )}

you can see the different options available for each command using:
  snel  ${colors.yellow("[command] --help or -h")}
`
    )
  );
}

export const keyWords = {
  create: "create",
};
