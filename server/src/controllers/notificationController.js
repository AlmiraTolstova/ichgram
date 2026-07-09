export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
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
  await Notification.updateMany(
    {
      recipient: req.user.id,
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
  });
};

export const getUnreadNotifications = async (req, res) => {
  const count = await Notification.countDocuments({
    recipient: req.user.id,
    isRead: false,
  });

  res.json({ count });
};
