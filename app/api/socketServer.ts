import { Server } from "socket.io";
import cors from "cors";

interface DoctorUpdate {
  notification: {
    appointmentId: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
  };
  status: {
    name: string;
    id: string;
  };
  time: string;
  date: Date;
  doctor: {
    id: string;
    name: string;
  };
  patient: {
    id: string;
    name: string;
  };
}

interface PostAppointment {
  notification: {
    appointmentId: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
  };
  time: string;
  date: Date;
  doctor: {
    id: string;
    name: string;
  };
  patient: {
    id: string;
    name: string;
  };
}

// Create a new instance of the CORS middleware
const corsMiddleware = cors();

export default function SocketHandler(req: any, res: any) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket/ping",
    addTrailingSlash: false,
  });

  // Event handler for client connections
  io.on("connection", (socket) => {
    const clientId = socket.id;
    console.log("A client connected");
    console.log(`A client connected. ID: ${clientId}`);
    io.emit("client-new", clientId);

    // Event handler for receiving messages from the client
    socket.on("message", (data) => {
      console.log("Received message:", data);
    });

    // Event handler for client disconnections
    socket.on("disconnect", () => {
      console.log("A client disconnected.");
    });

    socket.on("createAppointment", async (data: PostAppointment) => {
      const userId = data.notification.receiverId;
      const response = await fetch("/api/notification");
      if (response) {
        io.to(userId).emit("notification", {
          ...data,
          notificationId: response.json,
        });
      }
    });

    socket.on("doctorUpdate", async (data: DoctorUpdate) => {
      const userId = data.notification.receiverId;
      const response = await fetch("/api/notification");
      if (response) {
        io.to(userId).emit("notification", {
          ...data,
          notificationId: response.json,
        });
      }
    });
  });

  // Apply the CORS middleware to the request and response
  corsMiddleware(req, res, () => {
    res.socket.server.io = io;
    res.end();
  });
}
