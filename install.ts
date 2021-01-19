/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { PromptConfig } from "./src/cli/prompt.ts";
import { Create } from "./src/cli/create.ts";
import { build } from "./compiler/build.ts";

const { args } = Deno;

if (args[0] === "create") {
  await Create({ ...PromptConfig(), projectName: Deno.args[1] });
} else if (args[0] === "build") {

  await build("./App/src/App.svelte", {
    isRoot: true,
    outDir: "App/public/build/",
    dev: true
  });
}
