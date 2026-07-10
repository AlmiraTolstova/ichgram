import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../api/api";
import { Status } from "../../utils/Status";

export const getNotifications = createAsyncThunk(
  "search/getNotifications",
  async (query, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(API.Notifications.getNotifications(), {
        params: {},
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const initialState = {
  isOpen: false,
  notifications_list: [],
  message: "",
  status: {
    getNotifications: Status.NO_STATUS,
  },
};

const notificationsSlice = createSlice({
  name: "notificationsSlice",
  initialState,
  reducers: {
    openNotifications(state) {
      state.isOpen = true;
    },

    closeNotifications(state) {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.status.getNotifications = Status.LOADING;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.status.searchUsers = Status.DONE;
        state.notifications_list = action.payload;
        console.log(action.payload);
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.status.searchUsers = Status.ERROR;
        state.message = action.payload.message;
      });
  },
});

export const { openNotifications, closeNotifications } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
