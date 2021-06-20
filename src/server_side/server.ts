/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ServerProps, DevServerProps } from "./types.ts";
import { HotReload } from "../dev_server/hotReloading.ts";
import { join, toFileUrl } from "../../imports/path.ts";
import { RollupBuild } from "../../compiler/build.ts";
import { VERSION } from "../shared/version.ts";
import { Application } from "./imports/oak.ts";
import { serverLog } from "../cli/prompt.ts";
import { htmlBody } from "./templates.ts";
import { open } from "../shared/utils.ts";

export async function Server({
  path,
  clientPath,
  mode,
  port = 3000,
  dist = false,
}: ServerProps) {
  const serverSide = new Application();

  serverSide.use(async ({ response, request }) => {
    try {
      const { pathname, search, searchParams } = request.url;

      const module = await import(toFileUrl(join(Deno.cwd(), path)).href);
      const App = module?.default;

      response.headers.set("X-Powered-By", `Snel v${VERSION}`);

      if (request.method === "GET") {
        if (request.url.pathname === "/Snel/client" && clientPath) {
          response.headers.set("content-type", "application/javascript");

          const client = new TextDecoder("utf-8").decode(
            await Deno.readFile(join(Deno.cwd(), clientPath!))
          );

          response.body = client;
        } else {
          response.headers.set("content-type", "text/html");
          response.status = 200;
          let sendData = false;

          const { css, head, html } = App.render({
            Request: {
              PathName: pathname,
              Search: search,
              SearchParams: searchParams,
            },
            Response: {
              status(code = 200) {
                response.status = code;
                return this;
              },
              json(data = {}) {
                response.body = JSON.stringify(data, null, 2);
                response.headers.set("content-type", "application/json");
                sendData = true;
                return this;
              },
              send(data = "") {
                response.body = data;
                sendData = true;
                return this;
              },
              headers: {
                set(name = "", value = "") {
                  response.headers.set(name, value);
                  return this;
                },
                get(name = "") {
                  return response.headers.get(name);
                },
              },
            },
          });

          if (!sendData) {
            response.body = htmlBody({
              html,
              head,
              css: css.code,
              client: mode === "ssr" ? "Snel/client" : null,
            });
          }
        }
      } else {
        response.status = 405;
        response.headers.set("content-type", "text/html");
        response.body = "<h1>this method is not allowed, only GET method</h1>";
      }
    } catch (error) {
      console.log(error);
      response.status = 500;
      response.headers.set("content-type", "text/html");
      response.body = "<h1>Snel internal server Error</h1>";
    }
  });

  if (dist) {
    console.log(`Server running on: http://localhost:${port}`);
  }

  await serverSide.listen({ port: Number(port), hostname: "0.0.0.0" });
}

export async function DevServer({
  path,
  clientPath,
  mode,
  port = 3000,
  entryFile,
  outDir,
  plugins,
  dirName,
  localNet,
  ipv4
}: DevServerProps) {

  const compiler = new Worker(
    new URL("./BuilderWorker.js", import.meta.url).href,
    {
      type: "module",
      deno: {
        namespace: true,
        permissions: {
          write: true,
          read: true,
          env: true,
          net: true,
        },
      },
    }
  );

  compiler.postMessage({
    clientPath,
    port: Number(port),
    path,
    mode,
    start: true,
    ipv4
  });

  serverLog({ port, dirName, localNet });

  setTimeout(async () => await open(`http://localhost:${port}`), 500);

  window.addEventListener("unload", () => {
    compiler.postMessage({
      end: true,
    });
  });

  await HotReload("./src", Number(port) + 1, async () => {
    compiler.postMessage({
      end: true,
    });

    await RollupBuild({
      entryFile: entryFile,
      production: false,
      generate: mode,
      dir: outDir,
      plugins,
    });

    compiler.postMessage({
      clientPath,
      port: Number(port),
      path,
      mode,
      start: true
    });
  });
}
