/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { HtmlBodyProps } from "./types.ts";

export function htmlBody({
  css = "",
  html = "",
  head = "",
  client = null,
}: HtmlBodyProps) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${head}
      <style>${css}</style>
      ${client ? `<script defer src="${client}"></script>` : ""}
    </head>
  <body>
    ${html}
  </body>
  </html>`;
}

export const ssgMain = `<script>
  import Home from "@/components/Home.svelte";

  export let PathName = "/";
</script>

{#if PathName === "/"}
  <Home name={"World"} />
{:else}
  <main>
    <h1>404 not found</h1>
  </main>
{/if}

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
`;

export const ssgHome = `<script>
  export let name;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
`;
