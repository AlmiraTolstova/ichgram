import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import authRoutes from "./routes/authRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";
import cors from "cors";

dotenv.config({
  path: "/Users/almiratolstova/Documents/Projects/ICH/ichgram/server/.env",
});

const app = express();

// Подключение к MongoDB
connectDB();

app.use(cors());
app.use(express.json()); // работа с JSON

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at http://127.0.0.1:${PORT}`);
});
