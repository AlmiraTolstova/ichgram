import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API } from "../../api/api";
import { Status } from "../../utils/Status";
import { followUser, unfollowUser } from "./otherProfileSlice";

export const getPostByPostID = createAsyncThunk(
  "posts/getPostByPostID",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        API.Posts.getPostByPostId(getState().posts.targetPost._id),
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
    }
  },
);

export const getFeed = createAsyncThunk(
  "posts/getFeed",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(API.Posts.getFeed(), {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
    }
  },
);

export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async (postId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        API.Posts.toggleLike(postId),
        {},
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
    }
  },
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, text }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        API.Posts.addComment(postId),
        { text },
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

export const updateComment = createAsyncThunk(
  "posts/updateComment",
  async ({ commentId, text }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        API.Posts.updateComment(commentId),
        { text },
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

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (commentId, { getState, rejectWithValue }) => {
    try {
      await axios.delete(API.Posts.deleteComment(commentId), {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      return commentId;
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

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    feed: [],
    targetPost: {},
    currentPost: {},
    postID: null,
    openModal: false,
    message: "",
    status: {
      currentPost: Status.NO_STATUS,
      feed: Status.NO_STATUS,
      toggleLike: Status.NO_STATUS,
      addComment: Status.NO_STATUS,
      updateComment: Status.NO_STATUS,
      deleteComment: Status.NO_STATUS,
    },
  },
  reducers: {
    openExistPostModal: (state, action) => {
      state.openModal = true;
      state.targetPost = action.payload;
    },
    closeExistPostModal: (state) => {
      state.openModal = false;
      state.currentPost = {};
    },
    resetExistPostStatus(state) {
      state.status.createPost = Status.NO_STATUS;
    },

    updateFollowingInFeed(state, action) {
      const { userId, isFollowing } = action.payload;
      console.log("updateFollowingInFeed", action.payload);
      state.feed.forEach((post) => {
        if (post.author._id === userId) {
          post.isFollowing = isFollowing;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostByPostID.pending, (state) => {
        state.status.currentPost = Status.LOADING;
      })
      .addCase(getPostByPostID.fulfilled, (state, action) => {
        state.status.currentPost = Status.DONE;
        state.currentPost = action.payload;
      })
      .addCase(getPostByPostID.rejected, (state, action) => {
        state.status.currentPost = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(getFeed.pending, (state) => {
        state.status.feed = Status.LOADING;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.status.feed = Status.DONE;
        state.feed = action.payload;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.status.feed = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(toggleLike.pending, (state) => {
        state.status.toggleLike = Status.LOADING;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.status.toggleLike = Status.DONE;
        const post = state.feed.find(
          (post) => post._id === action.payload.postId,
        );

        if (post) {
          post.likesCount = action.payload.likesCount;
          post.isLiked = action.payload.isLiked;
        }

        if (
          state.currentPost &&
          state.currentPost._id === action.payload.postId
        ) {
          state.currentPost.likesCount = action.payload.likesCount;
          state.currentPost.isLiked = action.payload.isLiked;
        }
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.status.toggleLike = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(addComment.pending, (state) => {
        state.status.addComment = Status.LOADING;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status.addComment = Status.DONE;
        state.currentPost.comments = [
          ...state.currentPost.comments,
          action.payload.comment,
        ];
        state.currentPost.commentsCount = action.payload.commentsCount;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status.addComment = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(updateComment.pending, (state) => {
        state.status.updateComment = Status.LOADING;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status.updateComment = Status.DONE;
        const comment = state.currentPost.comments.find(
          (item) => item._id === action.payload._id,
        );

        if (comment) {
          comment.text = action.payload.text;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status.updateComment = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.status.deleteComment = Status.LOADING;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status.deleteComment = Status.DONE;
        state.currentPost.comments = state.currentPost.comments.filter(
          (comment) => comment._id !== action.payload,
        );
        state.currentPost.commentsCount = action.payload.commentsCount;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status.deleteComment = Status.ERROR;
        state.message = action.payload.message;
      });

    builder.addCase(followUser.fulfilled, (state, action) => {
      const { followUserId } = action.payload;
      console.log("updateFollowingInFeed follow", action.payload);
      state.feed.forEach((post) => {
        if (post.author._id === followUserId) {
          post.isFollowing = true;
        }
      });
    });
    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      const { unfollowUserId } = action.payload;
      console.log("updateFollowingInFeed unfollow", action.payload);
      state.feed.forEach((post) => {
        if (post.author._id === unfollowUserId) {
          post.isFollowing = false;
        }
      });
    });
  },
});

function isTokenExpired(token) {
  if (!token) return true;
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

export const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const token = store.getState().auth.token;

  if (token && isTokenExpired(token)) {
    store.dispatch(logout());
  }

  return result;
};

export const {
  logout,
  openExistPostModal,
  closeExistPostModal,
  resetExistPostStatus,
  resetCreatePostStatus,
  updateFollowingInFeed,
} = postsSlice.actions;
export const selectPosts = (state) => state.posts;
export default postsSlice.reducer;
