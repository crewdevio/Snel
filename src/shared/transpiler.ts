/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { toFileUrl } from "../../imports/path.ts";
import { colors } from "../../imports/fmt.ts";

function stract(source: string) {
  const pattern = /import(?:["'\s]*([\w\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*$/gim;

  const isSvelte = (chunk: string) =>
    pattern.test(chunk) && (chunk.includes(".svelte") || chunk.includes("svelte/"));

  const chunks = source.split("\n");
  // get .svelte import statement
  const imports = [...chunks].filter((chunk) => isSvelte(chunk)).join("\n");
  // get .svelte import statement
  const code = [...chunks].filter((chunk) => !isSvelte(chunk)).join("\n");

  return {
    code,
    imports,
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
