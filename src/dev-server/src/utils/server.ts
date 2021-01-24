/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// deps
import { posix, extname } from "../../../../imports/path.ts";
import { listenAndServe } from "../../../../imports/http.ts";
import { assert } from "../../../../imports/assert_util.ts";

// types
import type { Response, ServerRequest } from "../../../../imports/http.ts";
import type { EntryInfo } from "./types.ts";

// pages
import errPage from "../pages/err.ts";
import dirPage from "../pages/dir.ts";

const encoder = new TextEncoder();

const MEDIA_TYPES: Record<string, string> = {
  ".md": "text/markdown",
  ".html": "text/html",
  ".htm": "text/html",
  ".json": "application/json",
  ".map": "application/json",
  ".txt": "text/plain",
  ".ts": "text/typescript",
  ".tsx": "text/tsx",
  ".js": "application/javascript",
  ".jsx": "text/jsx",
  ".gz": "application/gzip",
  ".css": "text/css",
  ".wasm": "application/wasm",
};

/** Returns the content-type based on the extension of a path. */
function contentType(path: string): string | undefined {
  return MEDIA_TYPES[extname(path)];
}

function setCORS(res: Response): void {
  if (!res.headers) {
    res.headers = new Headers();
  }
  res.headers.append("access-control-allow-origin", "*");
  res.headers.append(
    "access-control-allow-headers",
    "Origin, X-Requested-With, Content-Type, Accept, Range"
  );
}

async function serveFile(
  req: ServerRequest,
  filePath: string
): Promise<Response> {
  const [file, fileInfo] = await Promise.all([
    Deno.open(filePath),
    Deno.stat(filePath),
  ]);
  const headers = new Headers();
  headers.set("content-length", fileInfo.size.toString());
  const contentTypeValue = contentType(filePath);
  if (contentTypeValue) {
    headers.set("content-type", contentTypeValue);
  }
  req.done.then(() => {
    file.close();
  });
  return {
    status: 200,
    body: file,
    headers,
  };
}

async function serveDir(
  req: ServerRequest,
  dirPath: string,
  _target: string
): Promise<Response> {
  const dirUrl = `/${posix.relative(_target, dirPath)}`;
  const listEntry: EntryInfo[] = [];
  for await (const entry of Deno.readDir(dirPath)) {
    const filePath = posix.join(dirPath, entry.name);
    const fileUrl = posix.join(dirUrl, entry.name);
    if (entry.name === "index.html" && entry.isFile) {
      // in case index.html as dir...
      return serveFile(req, filePath);
    }
    // Yuck!
    let fileInfo = null;
    try {
      fileInfo = await Deno.stat(filePath);
    } catch (e) {
      // Pass
    }
    listEntry.push({
      name: entry.name,
      url: fileUrl,
      type: entry.isDirectory ? "folder" : "file",
    });
  }
  listEntry.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
  const formattedDirUrl = `${dirUrl.replace(/\/$/, "")}/`;
  const page = encoder.encode(dirPage(formattedDirUrl, listEntry));

  const headers = new Headers();
  headers.set("content-type", "text/html");

  const res = {
    status: 200,
    body: page,
    headers,
  };
  return res;
}

function serveFallback(_: ServerRequest, e: Error): Promise<Response> {
  if (e instanceof Deno.errors.NotFound) {
    return Promise.resolve({
      status: 404,
      body: errPage("404", "Not Found"),
    });
  } else {
    return Promise.resolve({
      status: 500,
      body: errPage("500", "Internal Server Error"),
    });
  }
}

export default function serve(port: number, dir: string, net?: boolean) {
  listenAndServe(
    { port, hostname: net ? "0.0.0.0" : "localhost" },
    async (req): Promise<void> => {
      let normalizedUrl = posix.normalize(req.url);
      try {
        normalizedUrl = decodeURIComponent(normalizedUrl);
      } catch (e) {
        if (!(e instanceof URIError)) {
          throw e;
        }
      }
      const fsPath = posix.join(dir, normalizedUrl);

      let response: Response | undefined;
      try {
        const fileInfo = await Deno.stat(fsPath);
        if (fileInfo.isDirectory) {
          response = await serveDir(req, fsPath, dir);
        } else {
          response = await serveFile(req, fsPath);
        }

        setCORS(response);
      } catch (e) {
        response = await serveFallback(req, e);
      } finally {
        assert(response);
        try {
          await req.respond(response!);
        } catch (e) {}
      }
    }
  );
}
