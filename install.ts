/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const install = async (name: string, url: string) => {
  const process = Deno.run({
    cmd: [
      ...`${Deno.execPath()} install -A -f -r --no-check --unstable -n ${name} ${url}`.split(
        " "
      ),
    ],
  });

  return (await process.status()).success;
};

async function Main() {
  await install("snel", "https://deno.land/x/snel/cli.ts");
  await install("trex", "https://deno.land/x/trex/cli.ts");
}

if (import.meta.main) {
  Main().then(() => {
    console.clear();
    console.log("installation complete.");
  }).catch((error: any) => {
    console.log(error?.message);
    console.log(error?.stack);
  });
}
