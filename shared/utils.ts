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
export const fileName = (path: string) => path.split(/(\\|\/)/g).pop();
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

  return files.filter((file) => name === file.name);
}
