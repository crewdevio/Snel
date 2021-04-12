/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { basename, join, toFileUrl } from "../imports/path.ts";
import { walk, WalkEntry } from "../imports/fs.ts";
import { colors } from "../imports/fmt.ts";

export const importPattern = /import(?:["'\s]*([\w*{}\n, ]+)from\s*)?["'\s]*([@\w/_-]+)["'\s].*/gm;
export const quotesPattern = /(["'])((?:\\\1|(?:(?!\1)).)*)(\1)/gm;
export const sveltePatter = /svelte\/?/gim;

export function siblings(source: string) {
  // get .svelte imports
  return source
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        (line.includes(".svelte") && importPattern.test(line)) ||
        (/import/gm.test(line) && !line.includes("svelte"))
    );
}

export function getPaths(imports: string[]) {
  return imports.map((route) => {
    let path: string = "";
    route.replace(quotesPattern, (match: string) => (path = match));

    // remove quotes
    return path.replace(/'/gm, "").replace(/"/gm, "");
  });
}

export const svelteToJs = (route: string) => route.replace(".svelte", ".js");
export const fileName = (path: string) => basename(path);
export function transform(source: string) {
  const paths = getPaths(siblings(source));
  const jsPaths = [...paths].map((path) => svelteToJs(path));

  return {
    paths,
    jsPaths,
  };
}

export async function findComponentPath(pathToFind: string) {
  const files: WalkEntry[] = [];
  for await (const file of walk(Deno.cwd(), { exts: ["svelte"] })) {
    files.push(file);
  }

  // remove relative paths
  const paths = pathToFind
    .split("/")
    .filter((path) => path !== "." && path !== "..");

  // join for unix or windows
  const normalize =
    Deno.build.os === "windows" ? paths.join("\\") : paths.join("/");

  return files.filter((file) => file.path.includes(normalize)).shift();
}

export async function open(url: string): Promise<void> {
  try {
    const programAliases = {
      windows: "explorer",
      darwin: "open",
      linux: "sensible-browser",
    };
    const process = Deno.run({ cmd: [programAliases[Deno.build.os], url] });
    await process.status();
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

      return ip.length ? ip[0] : null;
    } else {
      const process = Deno.run({
        cmd: ["ipconfig", "getifaddr", "en0"],
        stdout: "piped",
      });

      const ip = new TextDecoder().decode(await process.output()).trim();

      return ip.length ? ip : null;
    }
  } catch (error) {
    return null;
  }
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

export async function loadConfig<T extends any>(
  path: string
): Promise<T> {
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
