import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getNotifications,
  getUnreadNotifications,
  readNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/list", getNotifications);
router.put("/set-read", readNotifications);
router.put("/unread-count", getUnreadNotifications);

export default router;
