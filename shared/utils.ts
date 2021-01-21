/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { walk, WalkEntry } from "../imports/fs.ts";

const quotesPattern = /(["'])((?:\\\1|(?:(?!\1)).)*)(\1)/gm;
const importPattern = /import(?:["'\s]*([\w*{}\n, ]+)from\s*)?["'\s]*([@\w/_-]+)["'\s].*/gm;

export function siblings(source: string) {
  // get .svelte imports
  return source
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        (line.includes(".svelte") && importPattern.test(line)) ||
        /import/gm.test(line)
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
export const fileName = (path: string) => path.split(/(\\|\/)/g).pop()!;
export function transform(source: string) {
  const paths = getPaths(siblings(source));
  const jsPaths = [...paths].map((path) => svelteToJs(path));

  return {
    paths,
    jsPaths,
  };
}

export async function findComponentPath(name: string) {
  const files: WalkEntry[] = [];
  for await (const file of walk(Deno.cwd(), { exts: ["svelte"] })) {
    files.push(file);
  }

  return files.filter((file) => name === file.name)[0];
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
    console.log(error);
  }
}

export const Name = (path: string) => fileName(path)?.split(".")[0];

export const flags = {
  help: ["--help", "-h"],
  version: ["-v", "--version"],
};

export async function getIP() {
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
}

export const keyWords = {
  create: "create",
  build: "build",
  dev: "dev",
  serve: "serve",
};
