import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Sidebar from "../sidebar";
import Footer from "../footer";
import SearchPanel from "../searchPanel";
import NotificationsPanel from "../notificationsPanel";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { socket } from "../../socket/socket";
import { useDispatch } from "react-redux";
import { setUnreadNotifications } from "../../redux/slices/notificationsSlice.js";
import ConversationsPanel from "../conversationsPanel/index.jsx";
import { receiveMessage } from "../../redux/slices/conversationsSlice.js";
import CreatePostModal from "../createPostModal/index.jsx";

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
          overflow: "hidden",
        }}
      >
        {!isMobile && <Sidebar />}

        <SearchPanel isMobile={isMobile} />

        <NotificationsPanel isMobile={isMobile} />
        <ConversationsPanel isMobile={isMobile} />
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
        <CreatePostModal />
      </Box>

      <Footer />
    </Box>
  );
}

export default MainLayout;
