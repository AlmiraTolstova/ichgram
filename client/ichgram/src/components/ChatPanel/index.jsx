import { Box } from "@mui/material";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { closeChat } from "../../redux/slices/conversationsSlice";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ChatPanel = () => {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: "642px", // sidebar + conversations
        width: "calc(100vw - 642px)",
        height: "100vh",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        zIndex: 4,
      }}
    >
      <ChatHeader />
      <Box>
        <IconButton onClick={() => dispatch(closeChat())}>
          <ArrowBackIcon />
        </IconButton>

        <ChatHeader />
      </Box>
      <ChatMessages />

      <ChatInput />
    </Box>
  );
};

export default ChatPanel;
