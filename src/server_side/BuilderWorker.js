import { clientConnection } from "../dev_server/hotReloading.ts";
import ClientHot from "../dev_server/hotReloadingClient.js";
import { join, toFileUrl } from "../../imports/path.ts";
import { VERSION } from "../shared/version.ts";
import { Application } from "./imports/oak.ts";
import { htmlBody } from "./templates.ts";

self.onmessage = async (event) => {
  const { port, clientPath, path, mode, start, end, ipv4 } = event.data;

  const serverSide = new Application();
  const controller = new AbortController();

  if (start) {
    serverSide.use(async ({ response, request }) => {
      try {
        const { pathname, search, searchParams } = request.url;

        response.headers.set("X-Powered-By", `Snel v${VERSION}`);

        if (request.method === "GET") {
          if (request.url.pathname === "/Snel/client" && clientPath) {
            response.headers.set("content-type", "application/javascript");
            response.status = 200;

            const client = new TextDecoder("utf-8").decode(
              await Deno.readFile(join(Deno.cwd(), clientPath))
            );

            response.body = client;
          } if (request.url.pathname === "/__SNEL__HOT__RELOADING.js") {
            response.headers.set("content-type", "application/javascript");

            const client = `(${ClientHot.toString()})("${(ipv4) ?? "localhost" }");`

            response.status = 200;
            response.body = client;
          } else {
            response.headers.set("content-type", "text/html");
            response.status = 200;
            let sendData = false;

            const moduleRaw = await Deno.readTextFile(toFileUrl(join(Deno.cwd(), path)));
            const base64Module = `data:application/javascript;base64,${btoa(unescape(encodeURIComponent(moduleRaw)))}`;

            const module = await import(base64Module);
            const App = module?.default;

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
                hotReloading: clientConnection(),
              });
            }
          }
        } else {
          response.status = 405;
          response.headers.set("content-type", "text/html");
          response.body =
            "<h1>this method is not allowed, only GET method</h1>";
        }
      } catch (error) {
        console.log(error);
        response.status = 500;
        response.headers.set("content-type", "text/html");
        response.body = "<h1>Snel internal server Error</h1>";
      }
    });

    await serverSide.listen({
      port: Number(port),
      hostname: "0.0.0.0",
      signal: controller.signal,
    });
  }

  // stop server
  if (end) {
    controller.abort();
  }
};
