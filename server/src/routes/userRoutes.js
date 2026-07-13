import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  editUserData,
  followUser,
  getCurrentUserProfile,
  getProfile,
  searchUsers,
  unfollowUser,
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
router.post("/:id/follow", authMiddleware, followUser);

router.delete("/:id/unfollow", authMiddleware, unfollowUser);
router.get("/me", authMiddleware, getCurrentUserProfile);

export default router;
