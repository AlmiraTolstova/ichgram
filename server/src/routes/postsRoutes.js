import express from "express";
import {
  addComment,
  createPost,
  deleteComment,
  deletePost,
  getFeed,
  getPostByPostId,
  getPostsByUserID,
  toggleLike,
  updateComment,
  updatePost,
} from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadPost } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/post", uploadPost.single("image"), createPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);
router.get("/post/:id", getPostByPostId);
router.get("/postsbyuserid/:id", getPostsByUserID);
router.get("/feed", getFeed);
router.put("/:id/like", toggleLike);
router.post("/post/:id/comment", addComment);
router.put("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);

export default router;
