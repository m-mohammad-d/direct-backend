import { Server } from "socket.io";
import http from "http";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-chat", (chatId: string) => {
      socket.join(chatId);
    });

    socket.on("disconnect", () => {});
  });

  return io;
};

export { io };
