// utils/sendNotification.js

import Notification from "../models/Notifications.js";

export const sendNotification = async ({
  io,
  recipient,
  sender,
  type,
  post = null,
  comment = null,
}) => {
  const notification = await Notification.create({
    recipient,
    sender,
    type,
    post,
    comment,
  });
  await notification.populate([
    {
      path: "sender",
      select: "username avatar",
    },
    {
      path: "post",
      select: "image",
    },
  ]);

  const unreadCount = await Notification.countDocuments({
    recipient,
    isRead: false,
  });

  io.to(recipient.toString()).emit("notification", {
    notification,
    unreadCount,
  });

  return notification;
};
