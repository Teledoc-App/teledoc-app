import { Server } from "socket.io";
import * as http from "http";

const httpServer = http.createServer();

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

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
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

  socket.on("identifyUser", async () => {
    const response = await fetch("http://localhost:3000/api/notification");
    const data = await response.json();
    socket.join(data.receiverId);
  });

  // Event handler for client disconnections
  socket.on("disconnect", () => {
    console.log("A client disconnected.");
  });

  socket.on("createAppointment", async (data: PostAppointment) => {
    const userId = data.notification.receiverId;
    const response = await fetch("http://localhost:3000/api/notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
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

const PORT = 4001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
