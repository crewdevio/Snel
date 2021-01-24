/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { walk, WalkEntry } from "../imports/fs.ts";
import { basename } from "../imports/path.ts";

export const quotesPattern = /(["'])((?:\\\1|(?:(?!\1)).)*)(\1)/gm;
export const importPattern = /import(?:["'\s]*([\w*{}\n, ]+)from\s*)?["'\s]*([@\w/_-]+)["'\s].*/gm;

export const sveltePatter = /@svelte\/?/gim;
export const svelteImport = /from\s*?["'\s]*([@\wsvelte\/?/]+)["'\s]/gim;

export function siblings(source: string) {
  // get .svelte imports
  return source
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        (line.includes(".svelte") && importPattern.test(line)) ||
        (/import/gm.test(line) && !line.includes("@svelte"))
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
    console.log(error);
  }
}

export const Name = (path: string) => fileName(path).split(".").shift();

export const flags = {
  help: ["--help", "-h"],
  version: ["-v", "--version"],
};

export async function getIP() {
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
}

export function replaceToUrl(
  code: string,
  pattern: RegExp,
  url: string
) {
  return code
    .split("\n")
    .map((chunk) => chunk.trim())
    .map((chunk) => {
      if (pattern.test(chunk) || svelteImport.test(chunk)) {
        return chunk.replaceAll(
          pattern,
          url
        );
      }
      return chunk;
    })
    .join("\n");
}

export const keyWords = {
  create: "create",
  build: "build",
  dev: "dev",
  serve: "serve",
};
