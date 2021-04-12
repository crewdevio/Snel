/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { toFileUrl } from "../../imports/path.ts";
import { colors } from "../../imports/fmt.ts";

export function stract(source: string) {
  const svelteComponentPattern = /import(?:["'\s]*([\w\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*$/gim;

  const ends = (chunk: string) =>
    chunk.endsWith(".svelte'") ||
    chunk.endsWith(".svelte';") ||
    chunk.endsWith('.svelte"') ||
    chunk.endsWith('.svelte";');

  const start = (chunk: string) => chunk.startsWith("import");
  const has = (chunk: string) => chunk.includes(".svelte") || chunk.includes("svelte/");

  const isSvelte = (chunk: string) => svelteComponentPattern.test(chunk) && has(chunk) && start(chunk) && ends(chunk);

  const matchs = source.matchAll(svelteComponentPattern);

  const imports: any[] = [];

  for (const mtc of matchs) imports.push(mtc);

  return {
    code: source,
    imports: imports.flat(2).filter(isSvelte).join("\n"),
  };
}

export async function tsTranspiler(source: string, filename: string) {
  try {
    const { code, imports } = stract(source);

    const temp = await Deno.makeTempFile({ suffix: ".ts" });

    await Deno.writeFile(temp, new TextEncoder().encode(code));

    const { files } = await Deno.emit(toFileUrl(temp), { check: false });

    const key = Object.keys(files)
      .filter((key) => key.endsWith(".ts.js"))
      .shift()!;

    // merge compoenents imports and transpiled code
    return `${imports}\n${files[key]}`;
  } catch (error: any) {
    throw new Error(
      colors.yellow(
        `Transpiling typescript: ${
          colors.red(error.message) ?? ""
        } in component ${colors.yellow(filename)}`
      )
    ).message;
  }
}
