/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Server, Packet } from "../../imports/wocket.ts";

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
  for await (const { kind: eventKind } of Deno.watchFs(toWatch)) {
    if (events.includes(eventKind)) {
      if (kind !== eventKind) {
        server.to("Reload", "compiling");
        try {
          await action();
        } catch (error: any) {
          // report Build Error
          server.to(
            "Reload",
            JSON.stringify({
              type: "BuildError",
              message: error?.message,
              stack: error?.stack,
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
  return `    <script role="hot-reload">
      (() => {
        if ("WebSocket" in window) {
          const socket = new WebSocket("ws://${onNet ?? "localhost"}:${port}");

          socket.addEventListener("open", () => {
            console.log(
              "%c Snel %c Hot Reloading %c",
              "background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
              "background:#ff3e00; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
              "background:transparent"
            );

            socket.send(
              JSON.stringify({
                connect_to: ["Reload"],
              })
            );
          });

          socket.addEventListener("close", () => {
            console.log(
              "%c Hot Reloading %c connection cut off 🔌 %c",
              "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
              "background:#ff3e00 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
              "background:transparent"
            );
            alert("Hot Reloading connection cut off 🔌");
          });

          socket.addEventListener("error", () => {
            console.log(
              "%c Hot Reloading %c connection error %c",
              "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
              "background:#ff3e00 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
              "background:transparent"
            );
            alert("Hot Reloading connection error");
          });

          const Reload = () => {
            const badge = document.querySelector("#msg");
            if (badge) badge.setAttribute("style", "margin-top: 30px;");
            setTimeout(() => window.location.reload(), 50);
          }

          socket.addEventListener("message", (event) => {
            try {
              const { message } = JSON.parse(event.data);

              if (message === "reload") {
                console.log(
                  "%c 🔥 %c Reloading... %c",
                  "background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff;",
                  "background:#ff3e00; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;",
                  "background:transparent"
                );
                Reload();
              }

              if (message === "compiling") {
                console.log(
                  "%c 🔥 %c Recompiling... %c",
                  "background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff;",
                  "background:#ff3e00; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;",
                  "background:transparent"
                );
              } else {
                const { type, message, stack } = JSON.parse(
                  JSON.parse(event.data).message
                );

                document.body.style.backgroundColor = "#181b1c";
                document.body.style.color = "#f9f7f4";
                document.title = ${"`Snel ${type}`"};

                document.body.innerHTML =${`
                '<div style="margin: 40px;">' +
                '<h1 style="color: #e32945;">Snel:' +
                '  <span style="color: #dbdbd9;">'
                    + type.toString() + ' 😭 ' +
                '  </span>' +
                '</h1>' +
                '<hr>' +
                '<strong>\uD83D\uDCA5 Crashed: \uD83D\uDC49' +
                '  <span>' + message.toString() + '</span>' +
                '</strong>' +
                '<br>' +
                '<pre style="width: 50px; color: #757471; font-size: 20px;">'  + stack.toString() + '</pre>' +
                '<div id="msg" style="display: none;">' +
                  '<div style="background:transparent; text-aling: center;">' +
                    '<span style="background:#35495e; padding: 5px; border-radius: 3px 0 0 3px;  color: #fff;">' +
                      '🔥' +
                    '</span>' +
                    '<span style="background:#ff3e00; padding: 5px; border-radius: 0 3px 3px 0;  color: #fff;">' +
                      'Recompiling' +
                    '</span>' +
                  '</div>' +
                '</div>' +
              '</div>'`}
              }
            } catch (error) {}
          });
        } else {
          console.log(
            "%c Hot Reloading %c your browser not support websockets :( %c",
            "background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff;",
            "background:#ff3e00; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;",
            "background:transparent;"
          );
        }
      })();
    </script>`;
}
