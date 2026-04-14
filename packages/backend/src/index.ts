import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth";
import quizRoutes from "./routes/quiz";
import gameRoutes from "./routes/game";
import { socketHandlers } from "./socket/handlers";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === "production" 
      ? "https://your-frontend-domain.com"
      : "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/game", gameRoutes);

// Socket.io connection handling
io.on("connection", (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socketHandlers(socket, io, prisma);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Socket.io listening on ws://localhost:${PORT}`);
});
