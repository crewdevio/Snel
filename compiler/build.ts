/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fileName,
  transform,
  findComponentPath,
  Name,
} from "../shared/utils.ts";
import type { PreprocessorFunctionProps, RollupBuildProps } from "./types.ts";
import { ImportMapPlugin } from "../src/shared/import_map.ts";
import { compile as scssCompiler } from "../imports/scss.ts";
import { tsTranspiler } from "../src/shared/transpiler.ts";
import { URL_SVELTE_CDN } from "../src/shared/version.ts";
import { resolve, toFileUrl } from "../imports/path.ts";
import { decoder, encoder } from "../shared/encoder.ts";
import SVELTECOMPILER from "../src/shared/bundler.js";
import { compile, preprocess } from "./compiler.ts";
import { sveltePatter } from "../shared/utils.ts";
import type { BuildOptions } from "./types.ts";
import { rollup } from "../imports/drollup.ts";
import { colors } from "../imports/fmt.ts";
import { exists } from "../imports/fs.ts";
import { less } from "../imports/less.ts";

export async function build(
  path: string,
  { dev, outDir, isRoot, dist, fileOutPut, generate }: BuildOptions
) {
  if (!(await exists(path)) && isRoot) {
    throw new Error(
      colors.green(
        `the input (${colors.yellow(path)}) component to compile was not found.`
      )
    ).message;
  }

  try {
    const filename = fileName(path);
    const name = fileOutPut ?? Name(path);
    const source = decoder.decode(await Deno.readFile(path));

    const out = transform(source);

    const { code } = await preprocess(
      source,
      {
        async script({
          content,
          attributes,
          filename,
        }: PreprocessorFunctionProps) {
          let code = content;
          // transpile to javascript
          if (attributes?.lang === "ts") {
            code = await tsTranspiler(code, filename ?? "");
          }

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

        async style({
          attributes,
          filename,
          content,
        }: PreprocessorFunctionProps) {
          let css: string | null = null;

          try {
            // transform scss to css
            if (attributes?.lang === "scss") {
              css = scssCompiler(content);
            }

            // transform less  to css
            else if (attributes?.lang === "less") {
              const { css: code } = await less.render(content);
              css = code;
            }

            // asign styles
            css = css ?? content;
          } catch (error: any) {
            throw new Error(
              colors.red(`compiling to css ${colors.yellow(filename!)}`)
            ).message;
          }

          return {
            code: css,
          };
        },
      },
      {
        filename,
      }
    );

    // if not exist the out dir, create it
    if (outDir && !(await exists(outDir!))) {
      Deno.mkdir(resolve(Deno.cwd(), outDir!), { recursive: true });
    }

    const file = await Deno.create(`./${outDir ?? ""}${name}.js`);

    const compiled = compile(code, {
      filename: filename,
      generate: generate ?? "dom",
      name,
      dev: dev ?? false,
      sveltePath: URL_SVELTE_CDN,
      hydratable: generate === "ssr",
    });

    // replace internal lib
    compiled.js.code = compiled.js.code.replace(
      sveltePatter,
      `${URL_SVELTE_CDN}/`
    );

    if (isRoot) {
      compiled.js.code = compiled.js.code.replace(
        `export default ${name};`,
        `new ${name}({ target: document.body });`
      );
    }

    await file.write(encoder.encode(compiled.js.code));

    if (out.paths.length) {
      for (const path of out.paths) {
        const find = await findComponentPath(path);

        if (find) {
          await build(find.path, { dev: false, outDir, dist });
        } else if (!find && path.endsWith(".svelte")) {
          console.error(
            colors.green(
              `the component "${colors.yellow(
                path
              )}" could not be found to compile.`
            )
          );
        }
      }
    }
  } catch (error: any) {
    throw new Error(colors.red(error.message));
  }
}

export async function RollupBuild({
  dir = "./public/dist",
  entryFile = "./src/main.js",
  generate = "dom",
  plugins = [],
}: RollupBuildProps) {
  const base = toFileUrl(Deno.cwd()).href;

  generate = (generate === "ssg" || generate === "ssr") ? "ssr" : "dom";

  const options = {
    input: new URL(entryFile, `${base}/`).href,
    plugins: [
      ImportMapPlugin({
        maps: "./import_map.json",
      }),
      ...plugins,
      SVELTECOMPILER({ generate }),
    ],
    output: {
      dir,
      format: "es" as const,
      sourcemap: true,
    },
  };

  const bundle = await rollup(options);
  await bundle.write(options.output);
  await bundle.close();
}
