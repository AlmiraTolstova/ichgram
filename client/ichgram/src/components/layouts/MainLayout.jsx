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

function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNotification = (notification) => {
      console.log("Notification:", notification);
      dispatch(setUnreadNotifications(notification.unreadCount));
    };

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
    };

    socket.on("connect", handleConnect);
    socket.on("notification", handleNotification);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("notification", handleNotification);
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
