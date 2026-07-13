import User from "../models/User.js";
import path from "path";
import fs from "fs";
import Post from "../models/Post.js";
import mongoose from "mongoose";
import { sendNotification } from "../utils/sendNotification.js";

export const editUserData = async (req, res) => {
  try {
    const { username, link, about } = req.body;
    const user_id = req.user.id;

    const user = await User.findOne({
      _id: user_id,
    });

    if (!user) {
      return res.status(401).json({
        message: "User was not found",
      });
    }

    if (username !== undefined) user.username = username;
    if (link !== undefined) user.link = link;
    if (about !== undefined) user.about = about;

    await user.save();

    res.status(200).json({
      message: "Success!",
      user: {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        fullname: user.fullname,
        username: user.username,
        link: user.link,
        about: user.about,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadUserAvatar = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // удалить старый аватар
    if (user.avatar) {
      const oldFile = path.join(process.cwd(), user.avatar.replace(/^\//, ""));

      if (fs.existsSync(oldFile)) {
        fs.unlinkSync(oldFile);
      }
    }

    user.avatar = `/uploads/avatars/${req.file.filename}`;

    await user.save();

    res.status(200).json({
      message: "Avatar updated",
      user: {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        fullname: user.fullname,
        link: user.link,
        about: user.about,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim().length === 0) {
      return res.json([]);
    }

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(req.user.id) },
          username: {
            $regex: query,
            $options: "i",
          },
        },
      },
      {
        $addFields: {
          startsWith: {
            $regexMatch: {
              input: "$username",
              regex: `^${query}`,
              options: "i",
            },
          },
        },
      },
      {
        $sort: {
          startsWith: -1,
          username: 1,
        },
      },
      {
        $project: {
          username: 1,
          fullname: 1,
          avatar: 1,
        },
      },
      {
        $limit: 20,
      },
    ]);

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const [postsCount, posts] = await Promise.all([
      Post.countDocuments({ author: id }),
      Post.find({ author: id }).sort({ createdAt: -1 }),
    ]);
    const temp_user = user.toJSON();
    console.log(temp_user);

    res.json({
      user: {
        ...user.toObject(),
        postsCount: postsCount,
        followersCount: temp_user.followers.length,
        followingCount: temp_user.following.length,
      },
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user.id;

    if (currentUserId === id) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const alreadyFollowing = currentUser.following.includes(id);

    if (alreadyFollowing) {
      return res.status(400).json({
        message: "Already following",
      });
    }

    currentUser.following.push(userToFollow._id);

    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();

    // создаем уведомление
    await sendNotification({
      io: req.io,
      recipient: userToFollow._id,
      sender: currentUser._id,
      type: "follow",
    });

    res.json({
      success: true,
      message: "User followed",
      userId: currentUserId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;

    const currentUserId = req.user.id;

    await User.findByIdAndUpdate(currentUserId, {
      $pull: {
        following: id,
      },
    });

    await User.findByIdAndUpdate(id, {
      $pull: {
        followers: currentUserId,
      },
    });

    res.json({
      success: true,
      message: "User unfollowed",
      userId: currentUserId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const postsCount = await Post.countDocuments({
      author: user._id,
    });

    res.json({
      id: user._id,
      email: user.email,
      avatar: user.avatar,
      fullname: user.fullname,
      username: user.username,
      link: user.link,
      about: user.about,

      postsCount,
      followersCount: user.followers.length,
      followingCount: user.following.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
