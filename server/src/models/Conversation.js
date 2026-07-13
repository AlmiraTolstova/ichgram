import mongoose from "mongoose";

const conversationShema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  },
);

const Conversation = mongoose.model("Conversation", conversationShema);

export default Conversation;
