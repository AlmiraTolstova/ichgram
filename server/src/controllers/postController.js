import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { description } = req.body;
    const author = req.user.id;
    const image = req.file.filename;
    console.log(req.file);

    const post = await Post.create({
      author,
      image: `/uploads/images/${req.file.filename}`,
      description,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update Post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const Post = await Post.findOne({ _id: id, author: req.user.id });

    if (!Post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete Post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const Post = await Post.findOne({ _id: id, user: req.user.id });

    if (!Post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Post.findByIdAndDelete(id);

    res.json({ message: "The Post has been deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Posts by user id
export const getPostsByUserID = async (req, res) => {
  try {
    const { id } = req.params;

    let filter = { author: id };

    // // фильтр по статусу
    // if (status) {
    //   filter.status = status;
    // }

    // // фильтр по дате
    // if (startDate || endDate) {
    //   filter.createdAt = {};

    //   if (startDate) {
    //     filter.createdAt.$gte = new Date(startDate);
    //   }

    //   if (endDate) {
    //     filter.createdAt.$lte = new Date(endDate);
    //   }
    // }

    const Posts = await Post.find(filter).sort({ createdAt: -1 });

    res.json(Posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Post by post id
export const getPostByPostId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("getPostByPostId");

    //let filter = { author: userId };

    const post = await Post.findOne({ _id: id })
      .populate("author", "username fullname avatar")
      .populate("likes", "username avatar")
      .populate({
        path: "comments",
        options: {
          sort: { createdAt: 1 },
        },
        populate: {
          path: "author",
          select: "username avatar",
        },
      });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
