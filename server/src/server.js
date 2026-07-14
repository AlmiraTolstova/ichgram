import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import authRoutes from "./routes/authRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import http from "http";
import conversationRoutes from "./routes/converstationRoutes.js";
import Conversation from "./models/Conversation.js";
import Message from "./models/Message.js";
import { sendNotification } from "./utils/sendNotification.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: "/Users/almiratolstova/Documents/Projects/ICH/ichgram/server/.env",
});

const app = express();
const server = http.createServer(app);
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },

  transports: ["websocket", "polling"],

  pingTimeout: 60000,
  pingInterval: 25000,
});

// Подключение к MongoDB
connectDB();

app.use(express.json()); // работа с JSON

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/chat", conversationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log(`Пользователь подключился: ${socket.id}`);

  socket.on("join", (userId) => {
    socket.userId = userId;

    socket.join(userId);

    console.log(`${userId} joined personal room`);
  });

  socket.on("send_message", async ({ conversationId, text }) => {
    try {
      const conversation = await Conversation.findById(conversationId);
      const receiverId = conversation.participants.find(
        (id) => id.toString() !== socket.userId,
      );
      const message = await Message.create({
        conversation: conversationId,
        sender: socket.userId,
        text,
      });
      conversation.lastMessage = message._id;
      conversation.updatedAt = new Date();

      await conversation.save();
      const fullMessage = await Message.findById(message._id).populate(
        "sender",
        "username avatar",
      );

      io.to(socket.userId).emit("new_message", fullMessage);

      io.to(receiverId.toString()).emit("new_message", fullMessage);

      // if (receiverId.currentConversation !== conversationId) {
      //   await sendNotification({
      //     io,
      //     recipient: receiverId,
      //     sender: socket.userId,
      //     type: "message",
      //   });
      // }

      if (!conversation) return;
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Пользователь отключился: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server started at http://127.0.0.1:${PORT}`);
});
