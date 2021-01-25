/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { clientConnection } from "../dev-server/hotReloading.ts";
import { getIP } from "../../shared/utils.ts";

export const indexHtml = async (
  script: string,
  port: number
) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="./global.css" />
    <link rel="icon" type="image/png" href="https://svelte.dev/favicon.png">
    <title>Svelte app</title>
  </head>
  <body>
    <script type="module" src="${script}"></script>
    <!-- injected by snel don't remove it -->
${clientConnection(port, Deno.build.os === "windows" ? await getIP() : null)}
  </body>
</html>
`;
export const globalCss = `html,
body {
  position: relative;
  width: 100%;
  height: 100%;
}

body {
  color: #333;
  margin: 0;
  padding: 8px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

a {
  color: rgb(0, 100, 200);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:visited {
  color: rgb(0, 80, 160);
}

label {
  display: block;
}

input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  -webkit-padding: 0.4em 0;
  padding: 0.4em;
  margin: 0 0 0.5em 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 2px;
}

input:disabled {
  color: #ccc;
}

button {
  color: #333;
  background-color: #f4f4f4;
  outline: none;
}

button:disabled {
  color: #999;
}

button:not(:disabled):active {
  background-color: #ddd;
}

button:focus {
  border-color: #666;
}`;

export const rootSvelte = `<script>
  import Home from "./components/Home.svelte";
  import { fade } from "@svelte/transition";
  import { onMount } from "@svelte";

  let name = "World";
  let show = true;

  onMount(() => {
    setTimeout(() => {
      show = false;
    }, 5600);
  });
</script>

{#if show}
  <Home />
{:else}
  <main transition:fade>
    <h1>Hello {name}!</h1>
    <p>
      Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
      how to build Svelte apps.
    </p>
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

export const Home = `<script>
  import { fade, draw, fly } from "@svelte/transition";
  import { quintOut, cubicOut } from "@svelte/easing";
  import { onMount } from "@svelte";

  const inner = "M45.41,108.86A21.81,21.81,0,0,1,22,100.18,20.2,20.2,0,0,1,18.53,84.9a19,19,0,0,1,.65-2.57l.52-1.58,1.41,1a35.32,35.32,0,0,0,10.75,5.37l1,.31-.1,1a6.2,6.2,0,0,0,1.11,4.08A6.57,6.57,0,0,0,41,95.19a6,6,0,0,0,1.68-.74L70.11,76.94a5.76,5.76,0,0,0,2.59-3.83,6.09,6.09,0,0,0-1-4.6,6.58,6.58,0,0,0-7.06-2.62,6.21,6.21,0,0,0-1.69.74L52.43,73.31a19.88,19.88,0,0,1-5.58,2.45,21.82,21.82,0,0,1-23.43-8.68A20.2,20.2,0,0,1,20,51.8a19,19,0,0,1,8.56-12.7L56,21.59a19.88,19.88,0,0,1,5.58-2.45A21.81,21.81,0,0,1,85,27.82,20.2,20.2,0,0,1,88.47,43.1a19,19,0,0,1-.65,2.57l-.52,1.58-1.41-1a35.32,35.32,0,0,0-10.75-5.37l-1-.31.1-1a6.2,6.2,0,0,0-1.11-4.08,6.57,6.57,0,0,0-7.06-2.62,6,6,0,0,0-1.68.74L36.89,51.06a5.71,5.71,0,0,0-2.58,3.83,6,6,0,0,0,1,4.6,6.58,6.58,0,0,0,7.06,2.62,6.21,6.21,0,0,0,1.69-.74l10.48-6.68a19.88,19.88,0,0,1,5.58-2.45,21.82,21.82,0,0,1,23.43,8.68A20.2,20.2,0,0,1,87,76.2a19,19,0,0,1-8.56,12.7L51,106.41a19.88,19.88,0,0,1-5.58,2.45";

  const outer = "M65,34 L37,52 A1 1 0 0 0 44 60 L70.5,44.5 A1 1 0 0 0 65,34Z M64,67 L36,85 A1 1 0 0 0 42 94 L68,77.5 A1 1 0 0 0 64,67Z";

  function expand(node, params) {
    const { delay = 0, duration = 400, easing = cubicOut } = params;

    const w = parseFloat(getComputedStyle(node).strokeWidth);

    return {
      delay,
      duration,
      easing,
      css: (t) => ${"`opacity: ${t}; stroke-width: ${t * w}`"},
    };
  }

  let visible = false;

  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 800);

    setTimeout(() => {
      visible = false;
    }, 4800);
  });
</script>

{#if visible}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 124">
  <g out:fade={{ duration: 200 }} opacity="0.5">
    <path
      in:expand={{ duration: 400, delay: 1000, easing: quintOut }}
      style="stroke: #ff3e00; fill: #ff3e00; stroke-width: 50;"
      d={outer}
    />
    <path
      in:draw={{ duration: 1000 }}
      style="stroke:#ff3e00; stroke-width: 1.5"
      d={inner}
    />
  </g>
</svg>

<div class="centered" out:fly={{ y: -20, duration: 800 }}>
  {#each "SNEL" as char, i}
    <span in:fade={{ delay: 1000 + i * 150, duration: 800 }}>{char}</span>
  {/each}
</div>
{/if}

<link
  href="https://fonts.googleapis.com/css?family=Overpass:100,400"
  rel="stylesheet"
  />

<style>
  svg {
    width: 100%;
    height: 100%;
  }

  path {
    fill: white;
    opacity: 1;
  }

  .centered {
    font-size: 20vw;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: "Overpass";
    letter-spacing: 0.12em;
    color: #4b4b5a;
    font-weight: 400;
  }

  .centered span {
    will-change: filter;
  }
</style>
`;

export const gitIgnore = (dir: string) =>
  `/public/build/
.DS_Store
/${dir}`;
