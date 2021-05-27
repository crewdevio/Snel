/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Server, Packet } from "../../imports/wocket.ts";
import { join } from "../../imports/path.ts";
import Client from "./hotReloadingClient.js";

export async function HotReload(
  toWatch: string,
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
  const events = ["remove", "modify"];
  // execute action in the first load
  await action();

  for await (const { kind: eventKind } of Deno.watchFs(toWatch)) {
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
          continue;
        }
        server.to("Reload", "reload");
        kind = eventKind;
      }
      // debounce recompile
      setTimeout(() => (kind = ""), 3000);
    }
  }
}

export function clientConnection(
  port: number,
  onNet: string | null | undefined
) {
  const code = Client.toString()
    .replace("%port%", port.toString())
    // TODO(buttercubz): fix private net issues
    .replace("%onNet%", "localhost");

  return `    <script role="hot-reload">
      (${code})();
    </script>`;
}
