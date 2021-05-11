/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export interface CreateProjectOptions {
  root: string;
  port: number;
  projectName: string;
  mode: "ssr" | "dom" | "ssg";
}

export interface snelConfig extends Omit<CreateProjectOptions, "projectName"> {
  plugins: any[];
}
