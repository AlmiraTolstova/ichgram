import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../api/api";
import { Status } from "../../utils/Status";

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
