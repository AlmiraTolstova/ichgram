import Notification from "../models/Notifications.js";
import mongoose from "mongoose";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
      isRead: false,
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("sender", "username avatar")
      .populate("post", "image");

    res.json(notifications);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const readNotifications = async (req, res) => {
  const result = await Notification.updateMany(
    {
      recipient: new mongoose.Types.ObjectId(req.user.id),
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    },
  );

  res.json({
    success: true,
    result: result,
  });
};

export const getUnreadNotifications = async (req, res) => {
  const count = await Notification.countDocuments({
    recipient: req.user.id,
    isRead: false,
  });

  res.json({ count });
};
