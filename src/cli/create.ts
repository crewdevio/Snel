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
  gitIgnore,
  Home,
} from "./templates.ts";
import type { CreateProjectOptions } from "../shared/types.ts";
import { createDir, createFile } from "./io.ts";
import { colors } from "../../imports/fmt.ts";
import { join } from "../../imports/path.ts";

export async function CreateProject({
  root,
  port,
  projectName,
  buildDir,
}: CreateProjectOptions) {
  const startTime = Date.now();
  const projectRoot = `${Deno.cwd()}/${projectName}`;

  const dirs = [
    {
      name: projectName,
      path: Deno.cwd(),
    },
    {
      name: "public",
      path: `${Deno.cwd()}/${projectName}`,
    },
    {
      name: "src",
      path: `${Deno.cwd()}/${projectName}`,
    },
    {
      name: "components",
      path: `${Deno.cwd()}/${projectName}/src`,
    },
  ];

  const files = [
    {
      name: "index.html",
      path: `${projectRoot}/public`,
      source: await indexHtml(`./build/${root}.js`, parseInt(port) + 1),
    },
    {
      name: "global.css",
      path: `${projectRoot}/public`,
      source: globalCss,
    },
    {
      name: "snel.config.json",
      path: projectRoot,
      source: JSON.stringify(
        { root: `./src/${root}.svelte`, port, buildDir },
        null,
        2
      ),
    },
    {
      name: `${root}.svelte`,
      path: `${projectRoot}/src/`,
      source: rootSvelte,
    },
    {
      name: "Home.svelte",
      path: `${projectRoot}/src/components`,
      source: Home,
    },
    {
      name: ".gitignore",
      path: projectRoot,
      source: gitIgnore(buildDir),
    },
    {
      name: "run.json",
      path: projectRoot,
      source: JSON.stringify(
        {
          scripts: {
            __internal__: "snel dev",
            dev: "trex run __internal__",
            watch: "trex run __internal__ --watch",
            start: "snel serve",
            build: "snel build",
          },
          files: ["./src"],
        },
        null,
        2
      ),
    },
  ];

  for (const { name, path } of dirs) {
    await createDir(name, path);
  }

  for (const { name, path, source } of files) {
    await createFile(name, path, source);
  }

  const endTime = Date.now();

  console.clear();
  console.log(`
  Done in ${(endTime - startTime) / 1000}s.

  Success! Created ${projectName} at ${join(Deno.cwd(), projectName)}
  Inside that directory, you can run several commands:

    ${colors.blue("trex run start")} (experimental hot reloading)
      Starts the development server.

    ${colors.blue("trex run build")}
      Bundles the app into static files for production.

    ${colors.blue("trex run dev")}
      Compile the project in dev mode.

    ${colors.blue("trex run watch")}
      Compile the project in dev mode but using watch mode.

  We suggest that you begin by typing:

    ${colors.blue("cd")} ${projectName}
    ${colors.blue("trex run start")}
  `);
}
