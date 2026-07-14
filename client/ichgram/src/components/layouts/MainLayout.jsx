import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Sidebar from "../sidebar";
import Footer from "../footer";
import SearchPanel from "../searchPanel";
import NotificationsPanel from "../notificationsPanel";

import { createTheme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { socket } from "../../socket/socket";
import { useDispatch } from "react-redux";
import { setUnreadNotifications } from "../../redux/slices/notificationsSlice.js";
import ConversationsPanel from "../conversationsPanel/index.jsx";
import {
  addMessage,
  receiveMessage,
} from "../../redux/slices/conversationsSlice.js";

function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNotification = (notification) => {
      dispatch(setUnreadNotifications(notification.unreadCount));
      console.log(notification.unreadCount);
    };

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
    };

    const handleNewMessage = (message) => {
      dispatch(receiveMessage(message));
    };

    socket.on("connect", handleConnect);
    socket.on("notification", handleNotification);
    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("notification", handleNotification);
      socket.off("new_message", handleNewMessage);
    };
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        {/* <Sidebar /> */}
        {!isMobile && <Sidebar />}
        {/* <SearchPanel /> */}
        <SearchPanel isMobile={isMobile} />
        {/* <NotificationsPanel></NotificationsPanel> */}
        <NotificationsPanel isMobile={isMobile} />
        <ConversationsPanel isMobile={isMobile} />
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default MainLayout;
