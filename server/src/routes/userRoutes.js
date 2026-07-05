import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  editUserData,
  uploadUserAvatar,
} from "../controllers/userController.js";
import { uploadAvatar } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.put("/edituserdata", authMiddleware, editUserData);
router.put(
  "/avatar",
  authMiddleware,
  uploadAvatar.single("avatar"),
  uploadUserAvatar,
);

export default router;
