import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API } from "../../api/api";
import { Status } from "../../utils/Status";

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
    },
  },
  reducers: {
    openExistPostModal: (state, action) => {
      state.openModal = true;
      state.targetPost = action.payload;
    },
    closeExistPostModal: (state) => {
      state.openModal = false;
    },
    resetExistPostStatus(state) {
      state.status.createPost = Status.NO_STATUS;
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
        console.log(state);
      })
      .addCase(getPostByPostID.rejected, (state, action) => {
        state.status.currentPost = Status.ERROR;
        state.message = action.payload.message;
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
} = postsSlice.actions;
export const selectPosts = (state) => state.posts;
export default postsSlice.reducer;
