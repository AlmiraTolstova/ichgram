import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activePanel: null, // null | "search" | "notifications"
};

const sidebarPanelSlice = createSlice({
  name: "sidebarPanel",
  initialState,
  reducers: {
    openSearch(state) {
      state.activePanel = "search";
    },

    openNotifications(state) {
      state.activePanel = "notifications";
    },

    closePanel(state) {
      state.activePanel = null;
    },
  },
});

export const { openSearch, openNotifications, closePanel } =
  sidebarPanelSlice.actions;

export default sidebarPanelSlice.reducer;
