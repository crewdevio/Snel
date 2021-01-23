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

  for await (const _ of Deno.watchFs(toWatch)) {
    await action();
    server.to("Reload", "reload");
  }
}

export function clientConnection(port: number, onNet: string | null | undefined) {
  return `
    <script>
      (() => {
        const socket = new WebSocket("ws://${onNet ?? "localhost"}:${port}");

        socket.addEventListener("open", () => {
          console.log(
            "%c Snel %c Hot Reloading %c",
            "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
            "background:#ff3e00 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
            "background:transparent"
          );

          socket.send(
            JSON.stringify({
              connect_to: ["Reload"],
            })
          );
        });

        const Reload = () => setTimeout(() => window.location.reload(), 500);

        socket.addEventListener("message", (event) => {
          try {
            const { message } = JSON.parse(event.data);

            if (message === "reload") {
              console.log(
                "%c 🔥 %c Reloading... %c",
                "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
                "background:#ff3e00 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
                "background:transparent"
              );
              Reload();
            }
          } catch (error) {}
        });
      })();
    </script>`;
}
