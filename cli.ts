/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { HelpCommand, CommandNotFound } from "./shared/log.ts";
import type { snelConfig } from "./src/shared/types.ts";
import { flags, keyWords } from "./shared/utils.ts";
import { CreateProject } from "./src/cli/create.ts";
import { PromptConfig } from "./src/cli/prompt.ts";
import server from "./src/dev-server/server.ts";
import { readJson } from "./imports/jsonio.ts";
import { build } from "./compiler/build.ts";

async function Main() {
  const { args } = Deno;

  if (args[0] === keyWords.create) {
    if (flags.help.includes(args[1])) {
      return HelpCommand({
        command: {
          alias: [`${keyWords.create} App`],
          description: "create a template project",
        },
        flags: [{ alias: flags.help, description: "show command help" }],
      });
    }

    else {
      await CreateProject({ ...PromptConfig(), projectName: Deno.args[1] });
      console.clear();
      console.log(`cd ./${Deno.args[1]}\nsnel dev`);
    }
  }

  else if (args[0] === keyWords.build) {
    if (flags.help.includes(args[1])) {
      return HelpCommand({
        command: {
          alias: [keyWords.build],
          description: "build application for production",
        },
        flags: [{ alias: flags.help, description: "show command help" }],
      });
    }


    else {
      const { root, buildDir } = await readJson("./snel.config.json") as snelConfig;

      await build(root, { dev: false, isRoot: true, outDir: `./${buildDir}/` });
    }
  }

  else if (args[0] === keyWords.dev) {
    if (flags.help.includes(args[1])) {
      return HelpCommand({
        command: {
          alias: [keyWords.build],
          description: "build application for production",
        },
        flags: [{ alias: flags.help, description: "show command help" }],
      });
    }

    else {
        const { root, port } = await readJson("./snel.config.json") as snelConfig;

        await build(root, {
          isRoot: true,
          outDir: "./public/build/",
          dev: true,
        });

        // run dev server
        server(parseInt(port), "./public");
    }
  }

  else {
    CommandNotFound({
      commands: [keyWords.build, keyWords.create, keyWords.dev],
      flags: [...flags.help, ...flags.version],
    });
  }
}

if (import.meta.main) {
  await Main();
}
