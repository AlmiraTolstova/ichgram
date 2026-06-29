import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  checkTokenExpirationMiddleware,
} from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware().concat(checkTokenExpirationMiddleware);
  },
});

export default store;
