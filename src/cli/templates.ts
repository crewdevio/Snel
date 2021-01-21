/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const indexHtml = (script: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="./global.css" />
    <link rel="icon" type="image/png" href="https://svelte.dev/favicon.png">
    <title>Svelte app</title>
  </head>
  <body>
    <!-- injected by snel don't remove it -->
    <script type="module" src="${script}"></script>
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
	let name = "World";
</script>

<main>
	<h1>Hello {name}!</h1>
	<Home message={"to learn how to build Svelte apps."} />
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
</style>`;

export const Home = `<script>
 export let message;
</script>

<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> {message}</p>
`;

export const gitIgnore = `/public/build/
.DS_Store`;
