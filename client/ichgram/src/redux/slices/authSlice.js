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

const authSlice = createSlice({
  name: "auth",
  initialState: {
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
    },
  },
  reducers: {
    resetState: (state) => {
      state.status.register = Status.NO_STATUS;
      state.status.login = Status.NO_STATUS;
      state.message = "";
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
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
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status.login = Status.ERROR;
        state.message = action.payload.message;
        state.isSuccessLogin = false;
        state.isErrorLogin = true;
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
export default authSlice.reducer;
