/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fileName, transform, findComponentPath, Name } from "../shared/utils.ts";
import { decoder, encoder } from "../shared/encoder.ts";
import { compile, preprocess } from "./compiler.ts";

export async function build(path: string, isRoot?: boolean) {
  const filename = fileName(path);
  const name = Name(path);
  const source = decoder.decode(await Deno.readFile(path));

  const out = transform(source);

  const { code } = await preprocess(
    source,
    {
      markup({ content }) {
        let code = content;
        for (let index = 0; index < out.paths.length; index++) {
          code = code.replace(
            out.paths[index],
            `./${fileName(out.jsPaths[index])}`
          );
        }

        return {
          code,
        };
      },
    },
    {
      filename,
    }
  );

  const file = await Deno.create(`./${name}.js`);

  const compiled = compile(code, {
    filename: filename,
    generate: "dom",
    name,
    sveltePath: "https://esm.sh/svelte",
  });

  if (isRoot) {
    compiled.js.code = compiled.js.code.replace(
      `export default ${name};`,
      `new ${name}({ target: document.body });`
    );
  }

  await file.write(encoder.encode(compiled.js.code));

  if (out.paths.length) {
    for (const path of out.paths) {
      const name = fileName(path);
      const find = await findComponentPath(name);

      if (find) {
        await build(find.path);
      }
    }
  }
}
