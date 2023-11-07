import { Server } from "socket.io";
import http from "http";

const server = http.createServer((req, res) => {});
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("create-notification", (newNotification) => {
    io.emit("new-notification", newNotification);
  });
});

server.listen(3000, () => {
  console.log("Socket.IO server is running on port 3000");
});

export { io };
