import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "username avatar fullname")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    const result = await Promise.all(
      conversations.map(async (conversation) => {
        const participant = conversation.participants.find(
          (user) => user._id.toString() !== userId,
        );

        const unreadCount = await Message.countDocuments({
          conversation: conversation._id,
          sender: participant._id,
          isRead: false,
        });

        return {
          _id: conversation._id,
          participant,
          lastMessage: conversation.lastMessage,
          unreadCount,
          updatedAt: conversation.updatedAt,
        };
      }),
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const messages = await Message.find({
      conversation: id,
    })
      .populate("sender", "username avatar")
      .sort({
        createdAt: 1,
      });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const readConversation = async (req, res) => {
  try {
    const { id } = req.params;

    await Message.updateMany(
      {
        conversation: id,
        sender: {
          $ne: req.user.id,
        },
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
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;

    const senderId = req.user.id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    await conversation.populate("participants", "username avatar fullname");

    res.json(conversation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
