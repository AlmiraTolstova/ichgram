import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "../../utils/Status";
import axios from "axios";
import { API } from "../../api/api";

export const createConversation = createAsyncThunk(
  "chat/createConversation",
  async (receiverId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        API.Chat.createConversation(),
        {
          receiverId,
        },
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
    }
  },
);

export const getConversations = createAsyncThunk(
  "chat/getConversations",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(API.Chat.getConversations(), {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ??
          error.message ??
          "Something went wrong",
      });
    }
  },
);

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (conversationId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(API.Chat.getMessages(conversationId), {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ??
          error.message ??
          "Something went wrong",
      });
    }
  },
);

export const readConversation = createAsyncThunk(
  "chat/readConversation",
  async (conversationId, { getState, rejectWithValue }) => {
    try {
      await axios.put(
        API.Chat.readConversation(conversationId),
        {},
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        },
      );

      return conversationId;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ??
          error.message ??
          "Something went wrong",
      });
    }
  },
);

const initialState = {
  conversations: [],
  currentConversation: null,
  messages: [],
  chatOpen: false,
  unreadMessages: 0,
  conversationsOpen: false,

  status: {
    conversations: Status.NO_STATUS,
    messages: Status.NO_STATUS,
    sendMessage: Status.NO_STATUS,
    readConversation: Status.NO_STATUS,
    createConversation: Status.NO_STATUS,
  },

  message: "",
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setCurrentConversation(state, action) {
      state.currentConversation = action.payload;
      state.chatOpen = true;
    },

    addMessage(state, action) {
      state.messages.push(action.payload);
    },

    clearMessages(state) {
      state.messages = [];
    },

    increaseUnreadMessages(state) {
      state.unreadMessages++;
    },

    resetUnreadMessages(state) {
      state.unreadMessages = 0;
    },
    openConversations(state) {
      state.conversationsOpen = true;
    },
    closeConversations(state) {
      state.conversationsOpen = false;
    },
    clearCurrentConversation(state) {
      state.currentConversation = null;
      state.messages = [];
    },
    receiveMessage(state, action) {
      state.messages.push(action.payload);

      if (
        !state.currentConversation ||
        action.payload.conversation !== state.currentConversation._id
      ) {
        state.unreadMessages++;
      }
    },
    closeChat(state) {
      state.chatOpen = false;
      state.currentConversation = null;
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state) => {
        state.status.conversations = Status.LOADING;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status.conversations = Status.DONE;
        state.conversations = action.payload;

        state.unreadMessages = action.payload.reduce(
          (sum, conversation) => sum + conversation.unreadCount,
          0,
        );
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status.conversations = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(getMessages.pending, (state) => {
        state.status.messages = Status.LOADING;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.status.messages = Status.DONE;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.status.messages = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(readConversation.pending, (state) => {
        state.status.readConversation = Status.LOADING;
      })
      .addCase(readConversation.fulfilled, (state, action) => {
        state.status.readConversation = Status.DONE;
        const conversation = state.conversations.find(
          (c) => c._id === action.payload,
        );

        if (conversation) {
          state.unreadMessages -= conversation.unreadCount;
          conversation.unreadCount = 0;
        }
      })
      .addCase(readConversation.rejected, (state, action) => {
        state.status.readConversation = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(createConversation.pending, (state) => {
        state.status.createConversation = Status.LOADING;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.status.createConversation = Status.DONE;
        state.currentConversation = action.payload;
        state.conversationsOpen = true;
        state.chatOpen = true;
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.status.createConversation = Status.ERROR;
        state.message = action.payload.message;
      });
  },
});

export const {
  setCurrentConversation,
  addMessage,
  clearMessages,
  increaseUnreadMessages,
  resetUnreadMessages,
  openConversations,
  closeConversations,
  clearCurrentConversation,
  receiveMessage,
  closeChat,
} = conversationsSlice.actions;

export const selectConversations = (state) => state.conversations;

export default conversationsSlice.reducer;
