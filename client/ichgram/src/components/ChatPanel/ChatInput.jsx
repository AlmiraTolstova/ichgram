import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../socket/socket";

const ChatInput = () => {
  const [text, setText] = useState("");
  const { currentConversation } = useSelector((state) => state.conversations);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("send_message", {
      conversationId: currentConversation._id,
      text,
    });

    setText("");
  };
  return (
    <Box
      sx={{
        p: 3,
        borderTop: "1px solid #DBDBDB",
      }}
    >
      <TextField
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write message"
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "999px",
          },
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
    </Box>
  );
};

export default ChatInput;
