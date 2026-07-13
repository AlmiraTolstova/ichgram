import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { BASE_URL } from "../../api/api";

const ChatHeader = () => {
  const { currentConversation } = useSelector((state) => state.conversations);

  const currentUserId = useSelector((state) => state.auth.user.id);

  if (!currentConversation) return null;

  const user = currentConversation.participant;

  if (!user) return null;
  return (
    <Box
      sx={{
        height: 72,
        borderBottom: "1px solid #DBDBDB",
        display: "flex",
        alignItems: "center",
        px: 3,
      }}
    >
      <Avatar
        src={`${BASE_URL}${user.avatar}`}
        sx={{ width: 44, height: 44 }}
      />

      <Typography
        sx={{
          ml: 2,
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {user.username}
      </Typography>
    </Box>
  );
};

export default ChatHeader;
