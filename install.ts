/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// cache in instalation time
import "https://cdn.skypack.dev/svelte@3.44.2/transition";
import "https://cdn.skypack.dev/svelte@3.44.2/internal";
import "https://cdn.skypack.dev/svelte@3.44.2/animate";
import "https://cdn.skypack.dev/svelte@3.44.2/easing";
import "https://cdn.skypack.dev/svelte@3.44.2/motion";
import "https://cdn.skypack.dev/svelte@3.44.2/store";

const install = async (name: string, url: string, importmap?: boolean) => {
  const process = Deno.run({
    cmd: [
      Deno.execPath(),
      ...`install -q -A -f -r --no-check${
        importmap
          ? ` --import-map=https://deno.land/x/${name}/import_map.json`
          : ""
      } --unstable -n ${name} ${url}`.split(" "),
    ],
  });

  return (await process.status()).success;
};

async function Main() {
  await install("snel", "https://deno.land/x/snel/cli.ts");
  await install("trex", "https://deno.land/x/trex/cli.ts", true);
}

if (import.meta.main) {
  Main()
    .then(() => {
      console.log("installation complete.");
    })
    .catch((error: any) => {
      console.log(error);
    });
}
