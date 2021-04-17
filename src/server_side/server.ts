/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { join, toFileUrl } from "../../imports/path.ts";
import { VERSION } from "../shared/version.ts";
import { Application } from "./imports/oak.ts";
import { htmlBody } from "./templates.ts";

export async function Server(
  path: string,
  clientPath: string | null | undefined,
  mode: "ssr" | "ssg",
  port = 3000
) {
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
              json(data: any = {}) {
                response.body = JSON.stringify(data, null, 2);
                response.headers.set("content-type", "application/json");
                sendData = true;
                return this;
              },
              send(data: any = "") {
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

  await serverSide.listen({ port, hostname: "0.0.0.0" });
}
