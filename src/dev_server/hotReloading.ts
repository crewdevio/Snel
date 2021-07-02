/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Server, Packet } from "../../imports/wocket.ts";
import { join } from "../../imports/path.ts";

export async function HotReload(
  toWatch: string | string[],
  port: number,
  action: () => Promise<void> | void
) {
  const server = new Server();

  server.run({
    hostname: "0.0.0.0",
    port: port,
  });

  server.on("Reload", (packet: Packet) => {
    server.to("Reload", packet.message);
  });

  let kind = "";
  let cancellation = false;
  const events = ["remove", "modify"];

  for await (const { kind: eventKind } of Deno.watchFs(toWatch, { recursive: true })) {
    if (events.includes(eventKind)) {
      if (kind !== eventKind) {
        server.to("Reload", "compiling");
        try {
          await action();
        } catch (error: any) {
          const {
            message,
            stack,
            file,
            errorName,
            start,
            end,
            pos,
            frame,
          } = error;

          if (!cancellation) {
            // report Build Error
            server.to(
              "Reload",
              JSON.stringify({
                type: "BuildError",
                message: message,
                stack: stack,
                file: file.replaceAll("\\", "/"),
                filepath: join(Deno.cwd(), file),
                code: frame,
                errorName,
                start,
                end,
                pos,
              })
            );

            // cancellation debounce
            cancellation = true;
            setTimeout(() => (cancellation = false), 1000);
          }
          continue;
        }
        server.to("Reload", "reload");
        kind = eventKind;
      }
      // debounce recompile
      setTimeout(() => (kind = ""), 1000);
    }
  }
}

export function clientConnection() {
  return `    <script src="/__SNEL__HOT__RELOADING.js"></script>`;
}
