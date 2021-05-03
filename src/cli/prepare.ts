/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createDefaultPlugins } from "../../imports/bundler_defaults.ts";
import { svelteToJs, fileName, HTMLMinify } from "../shared/utils.ts";
import { ensureFile, exists } from "../../imports/fs.ts";
import { decoder, encoder } from "../shared/encoder.ts";
import { basename, join } from "../../imports/path.ts";
import { Bundler } from "../../imports/bundler.ts";

const hotReloadPattern = /<script\s*role="hot-reload"\s*>([\s\S]*?)<\/script>/gm;
const commetPattern = /<!--([\s\S]*?)-->/gm;

function preprocess(source: string, root: string) {
  const matches = source.matchAll(hotReloadPattern);

  root = fileName(svelteToJs(root));

  for (const match of matches) {
    source = source.replace(match[0], "");
    source = source.replace(commetPattern, "");
  }

  source = source.replace(
    `<script src="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js"></script>`,
    ""
  );
  source = source.replace(
    `<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js"></script>`,
    ""
  );

  return HTMLMinify(source);
}

export async function Dist(root: string) {
  const plugins = createDefaultPlugins();
  const bundler = new Bundler(plugins);

  if (!(await exists("./public/index.html"))) {
    throw new Error("index.html not found").message;
  }

  const entryHtml = "./public/__index.html";

  const copy = decoder.decode(await Deno.readFile("./public/index.html"));
  const html = await Deno.create(entryHtml);

  await html.write(encoder.encode(preprocess(copy, root)));

  const { bundles } = await bundler.bundle([entryHtml], {
    optimize: true,
    outputMap: {
      entryHtml: join(Deno.cwd(), "dist", "index.html"),
    },
  });

  for (let [output, source] of Object.entries(bundles)) {
    output = output.endsWith(".html") ? join("dist", "index.html") : join("dist", basename(output));

    await ensureFile(output);

    if (typeof source === "string") await Deno.writeTextFile(output, source);
    else await Deno.writeFile(output, source as Uint8Array);
  }

  await Deno.remove(entryHtml);
}
