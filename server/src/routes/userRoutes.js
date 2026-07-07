import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  editUserData,
  searchUsers,
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
router.get("/search", authMiddleware, searchUsers);

export default router;
