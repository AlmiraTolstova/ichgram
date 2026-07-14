import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // кому пришло уведомление
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // кто совершил действие
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // тип события
    type: {
      type: String,
      enum: ["like", "comment", "follow", "mention", "message"],
      required: true,
    },

    // пост (если относится к посту)
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },

    // комментарий (если относится к комментарию)
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    // прочитано ли
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Notification", notificationSchema);
