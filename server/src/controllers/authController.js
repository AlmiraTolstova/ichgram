import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Post from "../models/Post.js";

export const registerUser = async (req, res) => {
  try {
    const { email, fullname, username, password } = req.body;

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "The user already exists.",
      });
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({
        message: "The user already exists.",
      });
    }

    const user = await User.create({
      email,
      fullname,
      username,
      password,
    });

    res.status(201).json({
      message: "User registered",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);
    //const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const postsCount = await Post.countDocuments({
      author: user._id,
    });

    res.status(200).json({
      message: "Success!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        fullname: user.fullname,
        username: user.username,
        link: user.link,
        about: user.about,
        postsCount,
        followersCount: user.followers.length,
        followingCount: user.following.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
