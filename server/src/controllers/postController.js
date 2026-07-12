import Post from "../models/Post.js";
import Notification from "../models/Notifications.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";
import { sendNotification } from "../utils/sendNotification.js";

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
    const userId = req.user.id;

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

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const postObject = post.toObject();

    postObject.isLiked = post.likes.some(
      (user) => user._id.toString() === userId,
    );

    res.json(postObject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// получить ленту постов для страницы home
export const getFeed = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const posts = await Post.aggregate([
      // случайные посты
      {
        $match: {
          author: {
            $ne: userId,
          },
        },
      },
      {
        $sample: {
          size: limit,
        },
      },

      // автор поста
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },

      // считаем лайки и комментарии
      {
        $addFields: {
          likesCount: {
            $size: "$likes",
          },
          commentsCount: {
            $size: "$comments",
          },
        },
      },

      // последние два комментария
      {
        $lookup: {
          from: "comments",
          let: {
            postId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$post", "$$postId"],
                },
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 2,
            },

            // автор комментария
            {
              $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author",
              },
            },
            {
              $unwind: "$author",
            },

            {
              $project: {
                _id: 1,
                text: 1,
                createdAt: 1,
                author: {
                  _id: "$author._id",
                  username: "$author.username",
                  avatar: "$author.avatar",
                },
              },
            },
          ],
          as: "comments",
        },
      },

      // финальная структура
      {
        $project: {
          image: 1,
          description: 1,
          createdAt: 1,

          author: {
            _id: "$author._id",
            username: "$author.username",
            fullname: "$author.fullname",
            avatar: "$author.avatar",
          },

          likesCount: 1,
          commentsCount: 1,
          comments: 1,
          isLiked: {
            $in: [new mongoose.Types.ObjectId(req.user.id), "$likes"],
          },
        },
      },
    ]);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid post id",
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.some((like) => like.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((like) => like.toString() !== userId);
      await Notification.findOneAndDelete({
        recipient: post.author,
        sender: userId,
        post: post._id,
        type: "like",
      });
    } else {
      post.likes.push(userId);
      if (post.author.toString() !== userId) {
        await sendNotification({
          io: req.io,
          recipient: post.author,
          sender: userId,
          type: "like",
          post: post._id,
        });
      }
    }

    await post.save();

    res.status(200).json({
      postId: post._id,
      message: alreadyLiked ? "Like removed" : "Post liked",
      likesCount: post.likes.length,
      isLiked: !alreadyLiked,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
