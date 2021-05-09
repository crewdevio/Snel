/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { basename, join, toFileUrl } from "../../imports/path.ts";
import { colors } from "../../imports/fmt.ts";

export const svelteToJs = (route: string) => route.replace(".svelte", ".js");
export const fileName = (path: string) => basename(path);

export async function open(url: string): Promise<void> {
  try {
    const programAliases = {
      windows: "explorer",
      darwin: "open",
      linux: "sensible-browser",
    };
    const process = Deno.run({ cmd: [programAliases[Deno.build.os], url] });
    await process.status();
    process.close();
  } catch (error: unknown) {
    /* nothing here */
  }
}

export const Name = (path: string) => fileName(path).split(".").shift();

export const flags = {
  help: ["--help", "-h"],
  version: ["-v", "--version"],
};

export async function getIP() {
  try {
    if (Deno.build.os === "linux") {
      const process = Deno.run({
        cmd: ["hostname", "-I"],
        stdout: "piped",
      });

      const ip = new TextDecoder().decode(await process.output()).trim();
      process.close();

      return ip.length ? ip : null;
    } else if (Deno.build.os === "windows") {
      const process = Deno.run({
        cmd: ["ipconfig"],
        stdout: "piped",
      });

      const ip = new TextDecoder()
        .decode(await process.output())
        .split("\n")
        .filter((chunk) => chunk.includes("IPv4 Address"))
        .map((ip) => {
          return ip
            .trim()
            .replaceAll("\r", "")
            .replaceAll("IPv4 Address.", "")
            .replaceAll(" .", "")
            .replaceAll(" : ", "");
        });
        process.close();

      return ip.length ? ip[0] : null;
    } else {
      const process = Deno.run({
        cmd: ["ipconfig", "getifaddr", "en0"],
        stdout: "piped",
      });

      const ip = new TextDecoder().decode(await process.output()).trim();
      process.close();

      return ip.length ? ip : null;
    }
  } catch (error) {
    return null;
  }
}

export async function ipv4(port: string | number) {
  const ipv4 = await getIP()!;

  return ipv4?.split(" ").length === 1
    ? `http://${ipv4}`
    : ipv4
        ?.split(" ")
        .map((ip) => `http://${ip}:${port}`)
        .join(" or ");
}

export function showHelp() {
  console.log(
    colors.green(
      `A Cybernetical compiler for svelte applications

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
  build: "build",
  dev: "dev",
  serve: "serve",
};

export async function loadConfig<T extends any>(path: string): Promise<T> {
  const module = await import(toFileUrl(join(Deno.cwd(), path)).href);

  return module?.default;
}

export function ToString(object: object, deep = 1) {
  let str = `{\n`;

  for (const [key, value] of Object.entries(object)) {
    str += `${" ".repeat(deep * 2)}${key}: ${parser(value, deep)},\n`;
  }

  str += `${deep === 1 ? "" : " ".repeat(deep)}}`;

  return str;
}

function parser(type: any, deep: number): string {
  switch (typeof type) {
    case "string":
      return `"${type}"`;

    case "number":
      return `${type}`;

    case "boolean":
      return `${type}`;

    case "bigint":
      return `${type}n`;

    case "function":
      return `${type.toString()}`;

    case "object":
      if (type instanceof Object && !Array.isArray(type)) {
        return ToString(type, deep * 2);
      } else if (Array.isArray(type)) {
        return `[${type.map(
          (element) => `\n${" ".repeat(deep * 3)} ${parser(element, 2)}\n`
        )}]`;
      }
    default:
      return `${type}`;
  }
}

// output files and dirs
export const common = {
  entryFile: "./src/main.js",
  dom: {
    dir: "./public/dist",
  },
  ssg: {
    dir: "./__snel__",
    serverFile: "./__snel__/main.js",
  },
};

export function HTMLMinify(code: string) {
  return code
    .split("\n")
    .map((chunk) => chunk.trim())
    .join("");
}
