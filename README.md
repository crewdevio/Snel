<h1 align="center">Snel 🦕</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/crewdevio/Snel/main/static/svelte-logo.svg" width="250">
  <p align="center">A Cybernetical compiler for svelte applications in deno (Snel = fast in Nederlands) </p>
</p>

<p align="center">
   <a href="https://github.com/crewdevio/Snel/issues">
     <img alt="GitHub issues" src="https://img.shields.io/github/issues/crewdevio/Snel">
   </a>
   <a href="https://github.com/crewdevio/Snel/network">
     <img alt="GitHub forks" src="https://img.shields.io/github/forks/crewdevio/Snel">
   </a>
   <a href="https://github.com/crewdevio/Snel/stargazers">
     <img alt="GitHub stars" src="https://img.shields.io/github/stars/crewdevio/Snel">
   </a>
   <a href="https://github.com/crewdevio/Snel/blob/master/LICENSE">
     <img alt="GitHub license" src="https://img.shields.io/github/license/crewdevio/Snel">
   </a>
   <a href="https://deno.land">
     <img src="https://img.shields.io/badge/deno-%5E1.9.0-green?logo=deno"/>
   </a>
</p>

## What is Snel?

It is a `tool/framework` to compile .svelte component to javascript files to create web application using deno and svelte

## Main features

- simple setup
- quick compilation
- hot reloading
- [import maps](https://github.com/WICG/import-maps) support
- support for scss and less out of the box
- support for typescript
- [SSG](docs/ssg.md) (experimental)
- SSR (soon)

## What do I need to start using Snel?

the only thing you need is to run the installation command.

```console
deno run --allow-run --allow-read https://deno.land/x/snel/install.ts
```

> wait wait! Why should I run a script instead of using deno install to install Snel?

Snel uses several tools to create a better development experience, some of these tools are:

- [**trex**](https://github.com/crewdevio/Trex) to handle scripts and compilation in watch mode.
- [**bundler**](https://deno.land/x/bundler) minify and package all files for production

the [install.ts](https://github.com/crewdevio/Snel/blob/main/install.ts) file is responsible for installing all these tools so that you only worry about creating your application.

if you not want install snel, you can execute it using [trex](https://deno.land/x/trex)

```console
trex exec snel create [project name]
```

> **note**: if you decide use snel using trex exec you need to change this scripts inside run.json file

```javascript
{
  "scripts": {
    "start": "trex exec snel serve",
    "build": "trex exec snel build"
  },
  "files": [
    "./src"
  ]
}
```

## how to create a project with Snel?

after running the installation script you just have to run the create command:

```console
snel create [project name]
```

then you just have to enter the created project and start the development server

```console
cd ./[project name]

trex run start
```

this starts your application on a development server in the port you entered in the configuration

## Using svelte core libraries

to use svelte core libraries such as transition, store, motion etc. must be called using the following syntax:

```javascript
import { cubicOut } from "svelte/easing";
import { tweened } from "svelte/motion";
import { onMount } from "svelte";
```

`svelte` tells the compiler that svelte core resources are being accessed.

## Using import maps

You can use import maps to reference the dependencies you use, to use import maps from bes have an `import_map.json` file with the following structure:

```json
{
  "imports": {
    "[package name]": "[package url]"
  }
}
```

In order for the compiler to know that you are using import maps, you need to import the dependencies as follows:

```javascript
import moment from "moment";
import axios from "axios";
```

> **note**: you can use import maps inside svelte components

## Snel config file

snel uses a configuration file to define different things, like the development server port or add different plugins, this file can be named as `snel.config.js` or `snel.config.ts`.

`example: snel.config.js`

```javascript
export default {
  port: 3000, // development server port
  mode: "dom", // type project "dom" | "ssg"
  plugins: [], // plugins must be compatible with rollup deno
  extendsImportMap: [
    // extends import map using externas import maps
    "https://denopkg.com/crewdevio/Snel-carbon@main/components.map.json",
  ],
};
```

config options:

- port (number): port number for development server
- mode (string): type project "dom" | "ssg"
- plugins (Plugin[ ]): plugins must be compatible with [rollup deno](https://deno.land/x/drollup)
- extendsImportMap (string[ ]): extends from externas import maps

if you want to use `snel.config.ts` you can import `snelConfig` interface to provide type checking:

`example: snel.config.ts`

```typescript
import type { snelConfig } from "https://deno.land/x/snel/mod.ts";

export default <snelConfig>{
  ...
};
```

## Manage import maps dependencies using [trex](https://github.com/crewdevio/Trex)

if you don't have an import map.json file you can create it using the `trex install` command, trex is mainly focused on handling dependencies for `deno` but this doesn't prevent you from being able to use it to handle your dependencies for `snel/svelte`. to install any dependency you just have to use the [custom command](https://github.com/crewdevio/Trex#adding-custom-packages) from trex:

```console
trex --custom axios=https://cdn.skypack.dev/axios
```

this will install axios and it will make it accessible in the import map file:

```json
{
  "imports": {
    "axios": "https://cdn.skypack.dev/axios"
  }
}
```

> **note**: You should know that your dependencies must be compatible with [es modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and with the browser, if you refer to some import maps package and it is not found by the compiler, it will not be transformed, so an error will appear in your browser.

we recommend these sites for you to install your dependencies

- [skypack.dev](https://www.skypack.dev/)
- [esm.sh](https://esm.sh/)
- [jsdelivr.com](https://www.jsdelivr.com/)

## Typescript, Sass and Less support

snel supports typescript out the box, so you can import typescript files into `.svelte` components without specifying the use of typescript within the component.

`App.svelte`

```html
<script>
  import { PI } from "./pi.ts";
</script>

<h1>PI is = {PI}</h1>

<style>
  h1 {
    color: #ff3e00;
  }
</style>
```

`pi.ts`

```typescript
export const PI: number = Math.PI;
```

Something important to know is that if you are going to import from typescript files without specifying the use of typescript within the component, you can only import non-types elements, example:

- types
- interfaces

in case you want to use the typescript inside the components, you just have to specify it in the `lang` attribute:

```html
<script lang="ts">
  import { PI } from "./pi.ts";

  const message: string = "hello world";

  interface User {
    name: string;
    passworld: string;
  }

  let user: User = { name: "jhon", passworld: "1234" };
</script>
```

to import types and interfaces into components these must be specified using the following syntax:

```html
<script lang="ts">
  import type { .... } from "./types.ts";
</script>
```

and you should only import types using this syntax and not combine imports with other elements.

```html
<script lang="ts">
  // bad
  import type { UserInterface, myFunction } from "./user.ts";

  // good
  import type { UserInterface } from "./user.ts";
  import { myFunction } from "./user.ts";
</script>
```

> **note**: typescript support within components is not stable and compilation errors in hot reloading may appear.

in the same way you can use the syntax of sass and less inside the components to define the styles.

```html
<style lang="scss">
  /* .... */
</style>

<!-- or -->

<style lang="less">
  /* .... */
</style>
```

> **note**: for now importing external styles is not available for css, sass and less.

## Import components and files

when you create a project with snel you will notice that the components are imported as follows:

`example`

```javascript
// App.svelte
import Home from "@/components/Home.svelte";
```

`@/` It is equivalent to `./`, Similarly, if you need to access any component or file that is inside the src folder, you can use the following syntax:

`example`

```javascript
// src/Users.ts
export default class Users {
  ...
}
```

```javascript
// src/components/views/content/User.svelte
import Users from "~/Users.ts";
```

this would be equivalent to:

```javascript
import Users from "../../../Users.ts";
```

summary:

- `@/`
  - equivalent to `./`
- `~/`
  - equivalent to `[current work directory]/src/`
- `$/`
  - equivalent to `[current work directory]/`

this syntax can be used in javascript, typescript files and components.

> **note**: you can change the behavior by rewriting the pattern inside the import_map.json file, although be careful when doing this.

## Deploy SPA app

If you want to have a simple workflow to deploy your SPA application, you can use this.

`deploy`

```yml
name: Build and Deploy
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: windows-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v2.3.1

      - name: Install Deno
        uses: denolib/setup-deno@v2
        with:
          deno-version: v1.x

      - name: Build
        run: |
          deno run --allow-run --allow-read https://deno.land/x/snel/install.ts
          trex run build
      - name: Upload Artifacts 🔺
        uses: actions/upload-artifact@v1
        with:
          name: site
          path: dist

  deploy:
    needs: [build]
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v2.3.1

      - name: Download Artifacts 🔻
        uses: actions/download-artifact@v1
        with:
          name: site

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.4
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          branch: deploy
          folder: "site"
          clean-exclude: |
            vercel.json
            manifest.json
```

this compiles the application every time it is pushed to the `main` branch, and uploads the compiled files to the `deploy` branch, which could be deployed in hosts such as `vercel` or `netlify`.

If you are using the snel client router and you are going to deploy vercel or netlify you must add the respective configuration files to avoid having 404 errors.

`for vercel: vercel.json`

```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

`for netlify: _redirects`

```console
/*   /index.html   200
```

to avoid this files was removed in each deploy, you can ignore specific files:

```yml
....
      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.4
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          branch: deploy
          folder: "site"
          clean-exclude: |
            vercel.json # <- ignore vercel.json and manifest.json file
            manifest.json
```

for github pages you can use this trick:

create a `404.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>....</title>
  <script>
    sessionStorage.redirect = location.href;
  </script>
  <meta http-equiv="refresh" content="0;URL='/sghpa'"></meta>
</head>
  <body>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </body>
</html>
```

and in your `index.html` add this:


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>....</title>
  <style type="text/css">
    body:before {
      content: attr(message);
    }
  </style>
</head>
<body>
  .....
  <script>
    (() => {
      const redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      if (redirect && redirect !== location.href) {
        history.replaceState(null, null, redirect);
        // REMOVE THIS - just showing the redirect route in the UI
        document.body.setAttribute('message', 'This page was redirected by 404.html, from the route: ' + redirect);
      } else {
        // REMOVE THIS - just showing the redirect route in the UI
        document.body.setAttribute('message', 'This page was loaded directly from the index.html file');
      }
    })();
  </script>
</body>
</html>
```

## Hot Reloading

Snel provides hot reload capability, it compiles and updates the application when changes are applied to it

`example`

![img hot reload](https://raw.githubusercontent.com/crewdevio/Snel/main/static/hotreloading.gif)
