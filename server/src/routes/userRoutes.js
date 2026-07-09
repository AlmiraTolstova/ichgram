import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  editUserData,
  getProfile,
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
router.get("/:id/profile", authMiddleware, getProfile);

export default router;
