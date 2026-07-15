import { Box, Button, useMediaQuery, useTheme } from "@mui/material";

import ChatHeader from "./ChatHeader";
import ChatHeaderSmall from "./ChatHeaderSmall";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import {
  closeChat,
  selectConversations,
} from "../../redux/slices/conversationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ChatPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const conversationsSelector = useSelector(selectConversations);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: isMobile ? 0 : "642px",
        // left: "642px", // sidebar + conversations
        // width: "calc(100vw - 642px)",
        width: isMobile ? "90%" : "calc(100vw - 642px)",
        height: "100vh",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        zIndex: 4,
        padding: "1.5rem 1rem 0rem 1rem",
      }}
    >
      <Button onClick={() => console.log(conversationsSelector)}>
        reducer to console
      </Button>
      <ChatHeaderSmall />
      <Box sx={{ mb: 5 }}>
        <IconButton onClick={() => dispatch(closeChat())}>
          <ArrowBackIcon />
        </IconButton>

        <ChatHeader />
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatMessages />
      </Box>

      <ChatInput />
    </Box>
  );
};

export default ChatPanel;
