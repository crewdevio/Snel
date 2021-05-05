/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as colors from "fmt/colors.ts";
import * as esbuild from "esbuild";

export async function tsTranspiler(source: string, filename: string) {
  try {
    const { code } = await esbuild.transform(source, {
      loader: "ts",
      tsconfigRaw: {
        compilerOptions: {
          importsNotUsedAsValues: "preserve",
        },
      },
    });

    return code;
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
