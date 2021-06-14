/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

//@ts-ignore
import {
  VERSION,
  compile as svelteCompile,
  parse as svelteParse,
  preprocess as sveltePreprocess,
  walk as svelteWalk,
} from "../imports/compiler.ts";

import type { compileOptions, compileOut, PreprocessorGroup } from "./types.ts";

export function compile(source: string, options: compileOptions) {
  try {
    return svelteCompile(source, options) as compileOut;
  } catch (error: any) {
    // throw error data
    const { name, start, end, pos, filename, frame, stack, message } = error;

    throw {
        message,
        stack,
        file: filename,
        errorName: name,
        start,
        end,
        pos,
        frame,
      }
  }
}

export function preprocess(
  source: string,
  preprocessor: PreprocessorGroup | PreprocessorGroup[],
  options?: { filename?: string }
) {
  return sveltePreprocess(source, preprocessor, options);
}

export function parse(template: string, options?: any) {
  return svelteParse(template, options);
}

export function walk(ast: any, handler: any) {
  return svelteWalk(ast, handler);
}

export { VERSION };
