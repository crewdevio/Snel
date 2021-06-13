import { serve, serveTLS, ServerRequest, Response, Server } from "../../imports/http.ts";
import { mime } from "https://deno.land/x/mimetypes@v1.0.0/src/mime.ts";

import type { MimeTypeMap } from "https://deno.land/x/mimetypes@v1.0.0/src/mime.ts";
import { normalize, resolve } from "../../imports/path.ts";
import type { HTTPSOptions } from "../../imports/http.ts";
import type { Plugin } from "../../imports/drollup.ts";
import HotClient from "./hotReloadingClient.js";

export interface ServeOptions<T = unknown> {
  contentBase: Array<string>;
  port: number;
  host: string;
  headers: Record<string, string>;
  https?: HTTPSOptions;
  openPage: string;
  onListening: (adress: Record<string, string | number>) => void;
  mimeTypes?: MimeTypeMap;
  defaultType: string;
  verbose: boolean;
  open: boolean;
  historyApiFallback?: string | boolean;
}

export type Defined<T> = Exclude<T, undefined>;

export type Inner<T extends ServeOptions<unknown>> = T extends ServeOptions<
  infer X
>
  ? X
  : never;

export type ReadReturn = {
  err: ErrorConstructor | null;
  filePath: string;
  size: string | null;
  content: Uint8Array | null;
};

const { readFile } = Deno;

/**
 * Serve your rolled up bundle like webpack-dev-server
 * @param {ServeOptions|string|string[]} options
 */

type InitOptions =
  | string
  | Array<string>
  | { [K in keyof Options]?: Inner<Options[K]> };

class BuildServer {
  options: ServeOptions = {
    contentBase: [""],
    port: 3000,
    host: "localhost",
    headers: {},
    openPage: "",
    open: true,
    defaultType: "text/plain",
    verbose: true,
    onListening() {},
  };

  server: Server;
  first = true;
  constructor(initOptions: InitOptions = [""]) {
    if (Array.isArray(initOptions) || typeof initOptions === "string") {
      this.options.contentBase =
        typeof initOptions === "string" ? [initOptions] : initOptions;
    }

    Object.assign(this.options, initOptions);

    this.options.contentBase =
      typeof this.options.contentBase === "string"
        ? [this.options.contentBase]
        : this.options.contentBase;

    if (this.options?.mimeTypes) {
      mime.define(this.options?.mimeTypes, true);
    }

    this.server = !this.options.https
      ? serve({ port: this.options.port, hostname: this.options.host })
      : serveTLS(this.options.https);
  }

  async requestHandler(req: ServerRequest) {
    const response: Response = {
      headers: new Headers(this.options.headers),
    };

    // return snel hot reloading script
    if (req.method === "GET" && req.url === "/__SNEL__HOT__RELOADING.js") {
      const headers = new Headers();
      headers.set("Content-Type", "application/javascript");

      const response: Response = {
        body: `(${HotClient.toString()})()`,
        headers,
      }

      return req.respond(response);
    }

    // Remove querystring
    const unsafePath = decodeURI(req.url.split("?").shift()!);
    // Don't allow path traversal
    const urlPath = normalize(unsafePath);
    const { content, err, filePath, size } = await readFileFromContentBase(
      this.options.contentBase,
      urlPath
    );

    if (!err && content) {
      return req.respond(
        this.found(response, filePath, content, size ? size : "")
      );
    }

    if (err && err.name !== "NotFound") {
      response.status = 500;
      response.body = `500 Not Found\n\n${filePath}`;
      return req.respond(response);
    }

    if (this.options.historyApiFallback) {
      const fallbackPath =
        typeof this.options.historyApiFallback === "string"
          ? this.options.historyApiFallback
          : "/index.html";

      const {
        content: bContent,
        err: bError,
        filePath: bFilepath,
        size: bSize,
      } = await readFileFromContentBase(this.options.contentBase, fallbackPath);

      if (bError) {
        return req.respond(this.notFound(response, filePath));
      } else {
        return req.respond(
          this.found(
            response,
            bFilepath,
            bContent || new Uint8Array(0),
            bSize ? bSize : ""
          )
        );
      }
    } else {
      return req.respond(this.notFound(response, filePath));
    }
  }
  async serve() {
    if (this.options.onListening) {
      this.options.onListening({
        port: this.options.port,
        host: this.options.host,
        protocol: this.options.https ? "https" : "http",
      });
    }

    for await (const req of this.server) {
      this.requestHandler(req);
    }
  }

  notFound(response: Response, filePath: string): Response {
    response.status = 404;
    response.body = `404 Not Found\n\n${filePath}`;
    return response;
  }

  found(
    response: Response,
    filePath: string,
    content: Uint8Array,
    size: string
  ): Response {
    response.status = 200;
    if (response.headers) {
      response.headers.append("content-length", size);
      response.headers.append(
        "Content-Type",
        mime.getType(filePath) || this.options.defaultType
      );
    }
    response.body = content;
    return response;
  }

  green(text: string) {
    return text;
  }

  rollup() {
    const url = `${this.options.https ? "https" : "http"}://${
      this.options.host || "localhost"
    }:${this.options.port}`;

    let first = true;
    const options = this.options,
      green = this.green;
    this.serve();
    return {
      name: "serve",
      generateBundle() {
        if (first) {
          first = false;
          // Log which url to visit
          if (options.verbose! ?? false) {
            options.contentBase.forEach((base: string) => {
              console.log(green(url) + " -> " + resolve(base));
            });
          }
        }
      },
    };
  }
}

const readFileFromContentBase = async (
  contentBase: string[],
  urlPath: string
): Promise<ReadReturn> => {
  let filePath = resolve(contentBase[0] || ".", "." + urlPath);
  // Load index.html in directories

  if (urlPath.endsWith("/")) {
    filePath = resolve(filePath, "index.html");
  }

  if (!urlPath.endsWith("/") && !urlPath.includes(".")) {
    try {
      const fileInfo = await Deno.stat(filePath);
      filePath = fileInfo.isFile ? filePath : resolve(filePath, "index.html");
    } catch (err) {
      filePath;
    }
  }

  // Try Read
  try {
    const [content, fileInfo] = await Promise.all([
      readFile(filePath),
      Deno.stat(filePath),
    ]);

    return {
      err: null,
      filePath,
      size: fileInfo.size.toString(),
      content,
    };
  } catch (err) {
    if (err && contentBase.length > 1) {
      return readFileFromContentBase(contentBase.slice(1), urlPath);
    }
    // We know enough
    else
      return {
        err,
        filePath,
        size: null,
        content: null,
      };
  }
};

type Options = Record<string, ServeOptions<unknown>>;

export default (initOptions: InitOptions = [""]): Plugin => {
  const server = new BuildServer(initOptions);
  const plugin = server.rollup();
  return plugin;
};
