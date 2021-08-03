/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Plugin } from "../../imports/drollup.ts";

export interface HtmlBodyProps {
  css?: string;
  html?: string;
  head?: string;
  client?: string | null | undefined;
  hotReloading?: string | null | undefined;
}

export interface ServerProps {
  path: string;
  clientPath: string | null | undefined;
  mode: "ssr" | "ssg";
  port?: number | string;
  dist?: boolean;
}


export interface DevServerProps extends Omit<ServerProps, "dist">{
  outDir: string;
  entryFile: string;
  plugins: Plugin[];
  dirName: string;
  localNet: string;
  ipv4?: string;
}
