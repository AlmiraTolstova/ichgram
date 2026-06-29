import Post from "../models/Post.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { description, image } = req.body;
    const author = req.user.id;

    const Post = await Post.create({
      author,
      image,
      description,
    });

    res.status(201).json(Post);
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
    const { userId } = req.query;

    let filter = { author: userId };

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
    const { postId } = req.query;

    let filter = { author: userId };

    const Post = await Post.findOne({ _id: id });

    res.json(Posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
