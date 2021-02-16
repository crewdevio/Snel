/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { svelteToJs, fileName } from "../../shared/utils.ts";
import { decoder, encoder } from "../../shared/encoder.ts";
import { exists } from "../../imports/fs.ts";
import { Run } from "../../imports/run.ts";

const hotReloadPattern = /<script\s*role="hot-reload"\s*>([\s\S]*?)<\/script>/gm;
const commetPattern = /<!--([\s\S]*?)-->/gm;

function preprocess(source: string, root: string) {
  const matches = source.matchAll(hotReloadPattern);

  root = fileName(svelteToJs(root));

  for (const match of matches) {
    source = source.replace(match[0], "");
    source = source.replace(commetPattern, "");
  }

  return source;
}
export async function prepareDist(root: string) {
  if (!(await exists("./public/index.html"))) {
    throw new Error("index.html not found").message;
  }
  const copy = decoder.decode(await Deno.readFile("./public/index.html"));
  const html = await Deno.create("./public/__index.html");

  await html.write(encoder.encode(preprocess(copy, root)));
  await Run("bundle");
  await Deno.remove("./public/__index.html");
  await Deno.remove("./public/build", { recursive: true });
}
