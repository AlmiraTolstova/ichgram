import { configureStore } from "@reduxjs/toolkit";
import authSlice, { checkTokenExpirationMiddleware } from "./slices/authSlice";
import userProfileSlice from "./slices/userProfileSlice";
import postsSlice from "./slices/postsSlice";
import searchSlice from "./slices/searchSlice";
import otherProfileSlice from "./slices/otherProfileSlice";
import notificationsSlice from "./slices/notificationsSlice";

const loadState = () => {
  try {
    const serialized = localStorage.getItem("appState");
    if (!serialized) return undefined;

    return JSON.parse(serialized);
  } catch (e) {
    console.log("error with loading state from localStorage:", e);
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: userProfileSlice,
    posts: postsSlice,
    search: searchSlice,
    otherProfile: otherProfileSlice,
    notifications: notificationsSlice, // SideBar
  },
  preloadedState: loadState(),
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware().concat(checkTokenExpirationMiddleware);
  },
});

// подписка на изменения
store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "appState",
    JSON.stringify({
      auth: state.auth,
    }),
  );
});

export default store;
