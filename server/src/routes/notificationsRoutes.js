import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getNotifications,
  getUnreadNotifications,
  readNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/notifications", getNotifications);
router.put("/notifications/read", readNotifications);
router.put("/notifications/unread-count", getUnreadNotifications);

export default router;
