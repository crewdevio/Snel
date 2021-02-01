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
import { replaceToUrl, importMapToUrl, coreToUrl } from "../shared/utils.ts";
import { mapPattern, sveltePatter } from "../shared/utils.ts";
import { compile as scssCompiler } from "../imports/scss.ts";
import { decoder, encoder } from "../shared/encoder.ts";
import { compile, preprocess } from "./compiler.ts";
import { CleanCSS } from "../imports/clean-css.ts";
import { minify } from "../imports/terser.ts";
import { resolve } from "../imports/path.ts";
import { colors } from "../imports/fmt.ts";
import { BuildOptions } from "./types.ts";
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
        script({ content, attributes }) {

          // transpile to javascript
          if (attributes?.lang === "ts") {
            throw new Error("no typescript support yet.");
          }

          let code = content;

          // build in replace imports
          code = coreToUrl(code);

          for (let index = 0; index < out.paths.length; index++) {
            code = code.replace(
              out.paths[index],
              `./${fileName(out.jsPaths[index])}`
            );

            // replace svelte core
            code = replaceToUrl(
              code,
              sveltePatter,
              "https://cdn.skypack.dev/svelte@3.31.2/"
            );

            // import map support
            code = importMapToUrl(code, mapPattern, "@map:");
          }

          return {
            code,
          };
        },

        async style({ attributes, filename, content }) {
          let css: string | null = null;
          const clear = new CleanCSS({ compatibility: "*" });

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

            // minify css
            const { styles, errors, warnings } = clear.minify(css ?? content);

            if (warnings?.length) {
              warnings.forEach((warning: string) => {
                console.warn(colors.yellow(warning));
              });
            }

            if (errors?.length) {
              errors.forEach((errors: string) => {
                console.error(colors.red(errors));
              });
              throw new SyntaxError(colors.red("css error")).message;
            }

            // asign styles
            css = styles;
          } catch (error: any) {
            throw new Error(
              colors.red(`compiling to css ${colors.yellow(filename!)}`)
            ).message;
          }

          return {
            code: css ?? content,
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
      sveltePath: "https://cdn.skypack.dev/svelte@3.31.2",
      hydratable: generate === "ssr"
    });

    // replace internal lib
    compiled.js.code = compiled.js.code.replace(
      sveltePatter,
      "https://cdn.skypack.dev/svelte@3.31.2/"
    );

    if (isRoot) {
      compiled.js.code = compiled.js.code.replace(
        `export default ${name};`,
        `new ${name}({ target: document.body, ${generate === "ssr" ? "hydrate: true," : ""} });`
      );
    }

    // compress javascript to production
    if (dist) {
      const { code: minCode } = await minify(compiled.js.code, {
        compress: false,
        ecma: 2020,
        mangle: true,
        keep_classnames: true,
        keep_fnames: true,
      });

      if (minCode) {
        compiled.js.code = minCode;
      }
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
