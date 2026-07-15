import Post from "../models/Post.js";
import Notification from "../models/Notifications.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";
import { sendNotification } from "../utils/sendNotification.js";
import User from "../models/User.js";
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

    const post = await Post.findOne({ _id: id, author: req.user.id });

    if (!post) {
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

    const post = await Post.findOne({ _id: id, author: req.user.id });

    if (!post) {
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
    const limit = Number(req.query.limit) || 50;
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const currentUser = await User.findById(req.user.id)
      .select("following")
      .lean();

    const following = currentUser.following || [];

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
          isFollowing: {
            $in: ["$author._id", following],
          },
        },
      },
    ]);

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);

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

export const addComment = async (req, res) => {
  try {
    const { id } = req.params; // id поста
    const { text } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid post id",
      });
    }

    if (!text?.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      author: userId,
      post: post._id,
      text: text.trim(),
    });

    post.comments.push(comment._id);

    await post.save();

    // уведомляем автора поста, если это не он сам
    if (post.author.toString() !== userId) {
      await sendNotification({
        io: req.io,
        recipient: post.author,
        sender: userId,
        type: "comment",
        post: post._id,
        comment: comment._id,
      });
    }

    // сразу возвращаем комментарий с автором
    await comment.populate("author", "username avatar");

    res.status(201).json({
      comment,
      commentsCount: post.comments.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // редактировать может только автор
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    comment.text = text.trim();

    await comment.save();

    await comment.populate("author", "username avatar");

    res.json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const post = await Post.findById(comment.post);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // удалить комментарий может автор комментария или автор поста
    const canDelete =
      comment.author.toString() === req.user.id ||
      post.author.toString() === req.user.id;

    if (!canDelete) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // удаляем ссылку из поста
    post.comments.pull(comment._id);
    await post.save();

    // удаляем уведомление
    await Notification.findOneAndDelete({
      type: "comment",
      comment: comment._id,
    });

    // удаляем комментарий
    await Comment.findByIdAndDelete(comment._id);

    res.json({
      success: true,
      commentsCount: post.comments.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
