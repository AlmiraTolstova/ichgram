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

export const readNotifications = createAsyncThunk(
  "search/readNotifications",
  async (query, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        API.Notifications.readNotifications(),
        {},
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const initialState = {
  isOpen: false,
  notifications_list: [],
  unread_notificiatioon_count: 0,
  message: "",
  status: {
    getNotifications: Status.NO_STATUS,
    readNotifications: Status.NO_STATUS,
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

    setUnreadNotifications(state, action) {
      state.unread_notificiatioon_count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.status.getNotifications = Status.LOADING;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.status.getNotifications = Status.DONE;
        state.notifications_list = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.status.getNotifications = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(readNotifications.pending, (state) => {
        state.status.readNotifications = Status.LOADING;
      })
      .addCase(readNotifications.fulfilled, (state) => {
        state.status.readNotifications = Status.DONE;
        state.unread_notificiatioon_count = 0;
      })
      .addCase(readNotifications.rejected, (state, action) => {
        state.status.readNotifications = Status.ERROR;
        state.message = action.payload.message;
      });
  },
});

export const { openNotifications, closeNotifications, setUnreadNotifications } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
