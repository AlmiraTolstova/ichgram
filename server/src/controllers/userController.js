import User from "../models/User.js";
import path from "path";
import fs from "fs";
import Post from "../models/Post.js";
import mongoose from "mongoose";

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
        followingCount: temp_user.follows.length,
      },
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
