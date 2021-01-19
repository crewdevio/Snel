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
import { createDir, createFile } from "./io.ts";

export async function CreateProject({ root, port, projectName, buildDir }: any) {
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
    {
      name: "build",
      path: `${projectRoot}/public`,
    },
  ];

  const files = [
    {
      name: "index.html",
      path: `${projectRoot}/public`,
      source: indexHtml(`./build/${root}.js`),
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
      source: gitIgnore,
    },
  ];

  for (const { name, path } of dirs) {
    await createDir(name, path);
  }

  for (const { name, path, source } of files) {
    await createFile(name, path, source);
  }
}
