import express from "express";
import {
  createPost,
  deletePost,
  getPostByPostId,
  getPostsByUserID,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/post", createPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);
router.get("post/:id", getPostByPostId);
router.get("/postsbyuserid/:id", getPostsByUserID);

export default router;
