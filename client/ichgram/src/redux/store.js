import { configureStore } from "@reduxjs/toolkit";
import authSlice, { checkTokenExpirationMiddleware } from "./slices/authSlice";
import userProfileSlice from "./slices/userProfileSlice";
import postsSlice from "./slices/postsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: userProfileSlice,
    posts: postsSlice,
  },
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware().concat(checkTokenExpirationMiddleware);
  },
});

export default store;
