import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API } from "../../api/api";
import { Status } from "../../utils/Status";

export const getOwnPostsByUserID = createAsyncThunk(
  "userProfile/getPostsByUserID",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        API.Posts.getPostsByUserID(getState().auth.user.id),
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

export const createPost = createAsyncThunk(
  "userProfile/createPost",
  async ({ image, description }, { getState, rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("description", description);

      const response = await axios.post(API.Posts.createPost(), formData, {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

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

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { getState, rejectWithValue }) => {
    try {
      await axios.delete(API.Posts.deletePost(postId), {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      return postId;
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

export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async (avatar, { getState, rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("avatar", avatar);

      const response = await axios.put(API.User.uploadAvatar(), formData, {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

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

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    ownPostsList: [],
    lastPost: {},
    openModal: false,
    message: "",
    openPostActionMenu: false,
    status: {
      ownPostsList: Status.NO_STATUS,
      createPost: Status.NO_STATUS,
      deletePost: Status.NO_STATUS,
    },
  },
  reducers: {
    openCreatePostModal: (state) => {
      state.openModal = true;
    },
    closeCreatePostModal: (state) => {
      state.openModal = false;
    },
    resetCreatePostStatus(state) {
      state.status.createPost = Status.NO_STATUS;
    },
    setOpenPostActionMenu(state) {
      state.openPostActionMenu = true;
    },
    resetOpenPostActionMenu(state) {
      state.openPostActionMenu = false;
      state.openModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOwnPostsByUserID.pending, (state) => {
        state.status.ownPostsList = Status.LOADING;
      })
      .addCase(getOwnPostsByUserID.fulfilled, (state, action) => {
        state.status.ownPostsList = Status.DONE;
        state.ownPostsList = action.payload;
      })
      .addCase(getOwnPostsByUserID.rejected, (state, action) => {
        state.status.ownPostsList = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(createPost.pending, (state) => {
        state.status.createPost = Status.LOADING;
        state.message = "";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status.createPost = Status.DONE;
        state.lastPost = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status.createPost = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(deletePost.pending, (state) => {
        state.status.deletePost = Status.LOADING;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status.deletePost = Status.DONE;
        state.ownPostsList = state.ownPostsList.filter(
          (post) => post._id !== action.payload,
        );
        state.openPostActionMenu = false;
        state.openModal = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status.deletePost = Status.ERROR;
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
  const token = store.getState().userProfile.token;

  if (token && isTokenExpired(token)) {
    store.dispatch(logout());
  }

  return result;
};

export const {
  resetState,
  logout,
  openCreatePostModal,
  closeCreatePostModal,
  resetCreatePostStatus,
  setOpenPostActionMenu,
  resetOpenPostActionMenu,
} = userProfileSlice.actions;
export const selectUserProfile = (state) => state.profile;
export default userProfileSlice.reducer;
