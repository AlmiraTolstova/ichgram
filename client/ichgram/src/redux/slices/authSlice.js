import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API } from "../../api/api";
import { Status } from "../../utils/Status";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.Authorization.register(), userData);
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

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.Authorization.login(), userData);
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

export const editUserData = createAsyncThunk(
  "auth/edituserdata",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(API.User.editUserData(), userData, {
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

export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async (avatar, { getState, rejectWithValue }) => {
    console.log("by");

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

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(API.User.getCurrentUser(), {
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
  user: null,
  token: null,
  isSuccessRegister: false,
  isErrorRegister: false,
  isSuccessLogin: false,
  isErrorLogin: false,
  message: "",
  status: {
    register: Status.NO_STATUS,
    login: Status.NO_STATUS,
    editUserData: Status.NO_STATUS,
    avatar: Status.NO_STATUS,
    getCurrentUser: Status.NO_STATUS,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status.register = Status.NO_STATUS;
      state.status.login = Status.NO_STATUS;
      state.message = "";
    },
    logout: () => {
      localStorage.removeItem("token");
      return {
        ...initialState,
        token: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status.register = Status.LOADING;
        state.isSuccessRegister = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.status.register = Status.DONE;
        state.isSuccessRegister = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status.register = Status.ERROR;
        state.message = action.payload.message;
        state.isSuccessRegister = false;
        state.isErrorRegister = true;
      });

    builder
      .addCase(login.pending, (state) => {
        state.status.login = Status.LOADING;
        state.isSuccessLogin = false;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status.login = Status.DONE;
        state.isSuccessLogin = true;
        state.token = action.payload.token;
        //state.user = jwtDecode(action.payload.token).user;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status.login = Status.ERROR;
        state.message = action.payload.message;
        state.isSuccessLogin = false;
        state.isErrorLogin = true;
      });

    builder
      .addCase(editUserData.pending, (state) => {
        state.status.editUserData = Status.LOADING;
      })
      .addCase(editUserData.fulfilled, (state, action) => {
        state.status.editUserData = Status.DONE;
        state.user = action.payload.user;
      })
      .addCase(editUserData.rejected, (state, action) => {
        state.status.editUserData = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(uploadAvatar.pending, (state) => {
        state.status.avatar = Status.LOADING;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.status.avatar = Status.DONE;
        state.user = action.payload.user;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.status.avatar = Status.ERROR;
        state.message = action.payload.message;
      });

    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.status.getCurrentUser = Status.LOADING;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status.getCurrentUser = Status.DONE;
        state.user = action.payload.user;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status.getCurrentUser = Status.ERROR;
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

export const { resetState, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
