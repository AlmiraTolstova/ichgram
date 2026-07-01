import express from "express";
import {
  createPost,
  deletePost,
  getPostByPostId,
  getPostsByUserID,
  updatePost,
} from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/post", upload.single("image"), createPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);
router.get("/post/:id", getPostByPostId);
router.get("/postsbyuserid/:id", getPostsByUserID);

export default router;
