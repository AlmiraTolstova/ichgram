import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../api/api";
import { Status } from "../../utils/Status";
import { updateFollowingInFeed } from "./postsSlice";
import { useDispatch } from "react-redux";

export const getProfile = createAsyncThunk(
  "otherProfile/getProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        API.User.getProfile(getState().otherProfile.targetUserID),
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

export const followUser = createAsyncThunk(
  "otherProfile/followUser",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { targetUserID } = getState().otherProfile;

      const response = await axios.post(
        API.User.followUser(targetUserID),
        {},
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        },
      );

      // dispatch(
      //   updateFollowingInFeed({
      //     targetUserID,
      //     isFollowing: true,
      //   }),
      // );

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

export const unfollowUser = createAsyncThunk(
  "otherProfile/unfollowUser",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { targetUserID } = getState().otherProfile;
      const response = await axios.delete(
        API.User.unfollowUser(getState().otherProfile.targetUserID),
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        },
      );

      // dispatch(
      //   updateFollowingInFeed({
      //     targetUserID,
      //     isFollowing: false,
      //   }),
      // );

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

const otherProfleSlice = createSlice({
  name: "otherProfle",
  initialState: {
    targetUserID: "",
    user: {},
    lastPost: {},
    openModal: false,
    message: "",
    status: {
      getProfile: Status.NO_STATUS,
      openPost: Status.NO_STATUS,
      follow: Status.NO_STATUS,
      unfollow: Status.NO_STATUS,
    },
  },
  reducers: {
    openPostModal: (state) => {
      state.openModal = true;
    },
    closePostModal: (state) => {
      state.openModal = false;
    },
    resetPostStatus(state) {
      state.status.openPost = Status.NO_STATUS;
    },
    setTargetUserID(state, action) {
      state.targetUserID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status.getProfile = Status.LOADING;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status.getProfile = Status.DONE;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status.getProfile = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(followUser.pending, (state) => {
        state.status.follow = Status.LOADING;
      })

      .addCase(followUser.fulfilled, (state, action) => {
        state.status.follow = Status.DONE;
        console.log(action.payload);
        state.user?.user?.followers?.push(action.payload.userId);
      })

      .addCase(followUser.rejected, (state, action) => {
        state.status.follow = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(unfollowUser.pending, (state) => {
        state.status.follow = Status.LOADING;
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.status.follow = Status.DONE;

        // 1. Проверяем, загружен ли пользователь вообще
        if (state.user?.user) {
          // 2. Инициализируем массив фолловеров, если он почему-то равен null/undefined,
          //    чтобы избежать падения метода filter
          const followers = state.user.user.followers || [];

          // 3. Перезаписываем массив
          state.user.user.followers = followers.filter(
            (id) => id !== action.payload.userId,
          );
        }
      })

      .addCase(unfollowUser.rejected, (state, action) => {
        state.status.follow = Status.ERROR;
        state.message = action.payload.message;
      });
  },
});

export const {
  openPostModal,
  closePostModal,
  resetPostStatus,
  setTargetUserID,
} = otherProfleSlice.actions;
export const selectOtherProfile = (state) => state.otherProfile;
export default otherProfleSlice.reducer;
