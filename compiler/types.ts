/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export interface compileOptions {
  filename?: string;
  name?: string;
  format?: "esm" | "cjs";
  generate?: "dom" | "ssr";
  dev?: boolean;
  immutable?: boolean;
  hydratable?: boolean;
  legacy?: boolean;
  accessors?: boolean;
  customElement?: boolean;
  tag?: string | null;
  css?: boolean;
  loopGuardTimeout?: number;
  preserveComments?: boolean;
  preserveWhitespace?: boolean;
  outputFilename?: string;
  cssOutputFilename?: string;
  sveltePath?: string;
}

interface Map {
  version: number;
  names: string[];
  sources: string[];
  sourcesContent: string[];
  mappings: string;
}

interface Vars {
  name: string;
  export_name?: string;
  injected?: boolean;
  module?: boolean;
  mutated?: boolean;
  reassigned?: boolean;
  referenced?: boolean;
  referenced_from_script?: boolean;
  writable?: boolean;
}

interface Warnings {
  start?: { line: number; column: number; pos?: number };
  end?: { line: number; column: number };
  pos?: number;
  code: string;
  message: string;
  filename?: string;
  frame?: string;
  toString: () => string;
}

export interface compileOut {
  js: {
    code: string;
    map: Map;
  };
  css: {
    code: string;
    map: Map;
  };
  warnings: Warnings[];
  vars: Vars[];
  stats: {
    timings: {
      total: number;
      parse: { total: number };
      "create component": { total: number };
    };
  };
}
interface Processed {
  code: string;
  map?: string | object;
  dependencies?: string[];
}
type Preprocessor = (options: {
  content: string;
  attributes: Record<string, string | boolean>;
  filename?: string;
}) => Processed | Promise<Processed>;

export interface PreprocessorGroup {
  markup?: (options: {
    content: string;
    filename: string;
  }) => Processed | Promise<Processed>;
  style?: Preprocessor;
  script?: Preprocessor;
}

export interface BuildOptions {
  isRoot?: boolean;
  outDir?: string;
  dev?: boolean;
}
