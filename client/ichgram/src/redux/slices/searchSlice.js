import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../api/api";
import { Status } from "../../utils/Status";

export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async (query, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(API.User.searchUsers(), {
        params: {
          query,
        },
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
  query: "",
  users: [],
  message: "",
  status: {
    searchUsers: Status.NO_STATUS,
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openSearch(state) {
      state.isOpen = true;
    },

    closeSearch(state) {
      state.isOpen = false;
    },

    toggleSearch(state) {
      state.isOpen = !state.isOpen;
    },

    clearSearch(state) {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.status.searchUsers = Status.LOADING;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status.searchUsers = Status.DONE;
        state.users = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status.searchUsers = Status.ERROR;
        state.message = action.payload.message;
      });
  },
});

export const { openSearch, closeSearch, toggleSearch, clearSearch } =
  searchSlice.actions;

export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
