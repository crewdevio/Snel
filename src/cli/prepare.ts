/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Bundler, defaultPlugins } from "../../imports/bundler.ts";
import { ensureFile, exists } from "../../imports/fs.ts";
import { decoder, encoder } from "../shared/encoder.ts";
import { join, basename } from "../../imports/path.ts";
import { HTMLMinify } from "../shared/utils.ts";

const hotReloadPattern =
  /<script\s*src="\/__SNEL__HOT__RELOADING.js"\s*>([\s\S]*?)<\/script>/gm;
const commetPattern = /<!--([\s\S]*?)-->/gm;

function preprocess(source: string) {
  const matches = source.matchAll(hotReloadPattern);

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

export async function Dist() {
  const plugins = defaultPlugins();
  const bundler = new Bundler(plugins);

  if (!(await exists("./public/index.html"))) {
    throw new Error("index.html not found").message;
  }

  const entryHtml = "public/__index.html";

  const copy = decoder.decode(await Deno.readFile("./public/index.html"));
  const html = await Deno.create(entryHtml);

  await html.write(encoder.encode(preprocess(copy)));

  const { bundles } = await bundler.bundle([entryHtml], {
    optimize: true,
    outDirPath: "./dist",
    importMap: { imports: {} },
    reload: true,
  });

  type Deps = { target: string; replacer: string };

  const transform: Deps[] = [];

  for (let [output, source] of Object.entries(bundles)) {
    output = output.endsWith(".html")
      ? join("dist", "index.html")
      : join("dist", basename(output));

    // normalize path ./example to /example
    if (!output.endsWith(".html")) {
      transform.push({
        target: `="./${basename(output)}"`,
        replacer: `="/${basename(output)}"`,
      });
    }

    if (output.endsWith("index.html")) {
      source = (source as string).replace(`<base href="/deps/">`, "");
      source = (source as string).replaceAll(`defer=""`, "defer");
    }

    await ensureFile(output);

    if (typeof source === "string") await Deno.writeTextFile(output, source);
    else await Deno.writeFile(output, source as Uint8Array);
  }

  const indexHTML = join(Deno.cwd(), "dist", "index.html");
  const file = await Deno.readTextFile(indexHTML);
  let content = file;

  transform.forEach(
    ({ replacer, target }) => (content = content.replace(target, replacer))
  );

  await Deno.writeTextFile(indexHTML, content);
  await Deno.remove(entryHtml);
}
