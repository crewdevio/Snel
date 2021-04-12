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
          const { css, head, html } = App.render({
            PathName: pathname,
            Search: search,
            SearchParams: searchParams,
          });

          response.headers.set("content-type", "text/html");
          response.body = htmlBody({
            html,
            head,
            css: css.code,
            client: mode === "ssr" ? "Snel/client" : null,
          });
        }
      } else {
        response.headers.set("content-type", "text/html");
        response.body = `<h1>this method is not allowed, only GET method</h1>`;
      }
    } catch (error) {
      console.log(error);
    }
  });

  await serverSide.listen({ port, hostname: "0.0.0.0" });
}
