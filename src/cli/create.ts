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
  mainjs,
  config,
} from "./templates.ts";
import type { CreateProjectOptions } from "../shared/types.ts";
import { ssgHome, ssgMain } from "../server_side/templates.ts";
import { createDir, createFile } from "./io.ts";
import { ToString } from "../shared/utils.ts";
import { colors } from "../../imports/fmt.ts";
import { join } from "../../imports/path.ts";

export async function CreateProject(options: CreateProjectOptions) {
  const { root, port, projectName, mode } = options;

  const startTime = Date.now();
  const projectRoot = `${Deno.cwd()}/${projectName}`;

  const scripts = {
    domScript: {
      __internal__: "snel dev",
      dev: "trex run __internal__",
      watch: "trex run __internal__ --watch",
    },
    commonScript: {
      start: "snel serve",
      build: "snel build",
    },
    build() {
      return mode === "dom"
        ? { ...this.domScript, ...this.commonScript }
        : { ...this.commonScript };
    },
  };

  const builder = {
    domFiles: [
      {
        name: "index.html",
        path: `${projectRoot}/public`,
        source: await indexHtml("/dist/main.js"),
      },
      {
        name: "global.css",
        path: `${projectRoot}/public`,
        source: globalCss,
      },
    ],
    commonFiles: [
      {
        name: "snel.config.js",
        path: projectRoot,
        source: config(ToString({ port, mode, plugins: [] })),
      },
      {
        name: `${root}.svelte`,
        path: `${projectRoot}/src/`,
        source: mode === "dom" ? rootSvelte : ssgMain,
      },
      {
        name: "Home.svelte",
        path: `${projectRoot}/src/components`,
        source: mode === "dom" ? Home : ssgHome,
      },
      {
        name: ".gitignore",
        path: projectRoot,
        source: gitIgnore("dist"),
      },
      {
        name: "run.json",
        path: projectRoot,
        source: JSON.stringify(
          {
            scripts: scripts.build(),
            files:
              mode === "dom"
                ? ["./src", "./public/index.html", "./public/global.css"]
                : ["./src"],
          },
          null,
          2
        ),
      },
      {
        name: "main.js",
        path: `${projectRoot}/src/`,
        source: mainjs(root, mode),
      },
    ],
    domDir: [
      {
        name: "public",
        path: `${Deno.cwd()}/${projectName}`,
      },
    ],
    commonDirs: [
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
    ],
    files() {
      if (mode === "dom") {
        return [...this.commonFiles, ...this.domFiles];
      }

      return [...this.commonFiles];
    },
    dirs() {
      if (mode === "dom") {
        return [...this.commonDirs, ...this.domDir];
      }

      return [...this.commonDirs];
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
