/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  globalCss,
  indexHtml,
  rootSvelte,
  Home,
  mainjs,
  SVG,
  DTS,
  JSCONFIg,
  VITE,
  DENO,
} from "./templates.ts";
import type { CreateProjectOptions } from "../shared/types.ts";
import { createDir, createFile } from "./io.ts";
import { colors } from "../../imports/fmt.ts";
import { join } from "../../imports/path.ts";

export async function CreateProject(options: CreateProjectOptions) {
  const { projectName, port } = options;

  const startTime = Date.now();
  const projectRoot = `${Deno.cwd()}/${projectName}`;

  const builder = {
    domFiles: [
      {
        name: "index.html",
        path: projectRoot,
        source: indexHtml(),
      },
      {
        name: "app.css",
        path: `${projectRoot}/src/`,
        source: globalCss,
      },
      {
        name: "vite-env.d.ts",
        path: `${projectRoot}/src/`,
        source: DTS,
      },
      {
        name: "jsconfig.json",
        path: projectRoot,
        source: JSCONFIg,
      },
      {
        name: "App.svelte",
        path: `${projectRoot}/src/`,
        source: rootSvelte,
      },
      {
        name: "Counter.svelte",
        path: `${projectRoot}/src/components`,
        source: Home,
      },
      {
        name: "main.js",
        path: `${projectRoot}/src/`,
        source: mainjs(),
      },
      {
        name: "vite.config.mjs",
        path: projectRoot,
        source: VITE(port),
      },
      {
        name: "deno.json",
        path: projectRoot,
        source: DENO,
      },
      {
        name: "svelte.svg",
        path: `${projectRoot}/src/assets/`,
        source: SVG,
      },
    ],
    domDir: [
      {
        name: "public",
        path: `${Deno.cwd()}/${projectName}`,
      },
      {
        name: projectName,
        path: Deno.cwd(),
      },
      {
        name: "src",
        path: `${Deno.cwd()}/${projectName}`,
      },
      {
        name: "components",
        path: `${Deno.cwd()}/${projectName}/src`,
      },
      {
        name: "assets",
        path: `${Deno.cwd()}/${projectName}/src`,
      },
    ],
    files() {
      return [...this.domFiles];
    },
    dirs() {
      return [...this.domDir];
    },
  };

  for (const dir of builder.dirs()) {
    const { name, path } = dir;
    await createDir(name, path);
  }

  for (const file of builder.files()) {
    const { name, path, source } = file;
    await createFile(name, path, source);
  }

  const endTime = Date.now();

  console.clear();
  console.log(`
  Done in ${(endTime - startTime) / 1000}s.

  Success! Created ${projectName} at ${join(Deno.cwd(), projectName)}
  Inside that directory, you can run several commands:

    ${colors.blue("deno task dev")} (HMR)
      Starts the development server.

    ${colors.blue("deno task build")}
      Bundles the app into static files for production.

    ${colors.blue("deno task preview")}
      Compile the project in preview mode.

  We suggest that you begin by typing:

    ${colors.blue("cd")} ${projectName}
    ${colors.blue("deno task dev")}
  `);
}
