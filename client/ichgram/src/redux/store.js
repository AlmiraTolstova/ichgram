import { configureStore } from "@reduxjs/toolkit";
import authSlice, { checkTokenExpirationMiddleware } from "./slices/authSlice";
import userProfileSlice from "./slices/userProfileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: userProfileSlice,
  },
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware().concat(checkTokenExpirationMiddleware);
  },
});

export default store;
