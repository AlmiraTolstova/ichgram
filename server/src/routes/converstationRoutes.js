import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createConversation,
  getConversations,
  getMessages,
  readConversation,
} from "../controllers/conversationController.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getConversations);

router.get("/:id/messages", getMessages);

router.put("/:id/read", readConversation);
router.post("/conversation", createConversation);

export default router;
