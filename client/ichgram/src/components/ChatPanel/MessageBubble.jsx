import { Avatar, Box, Typography } from "@mui/material";
import { BASE_URL } from "../../api/api";
import { useSelector } from "react-redux";

const MessageBubble = ({ message, showAvatar }) => {
  const { user } = useSelector((state) => state.auth);

  const own = message.sender._id === user.id;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: own ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      {!own && showAvatar && (
        <Avatar
          src={`${BASE_URL}${message.sender.avatar}`}
          sx={{
            width: 28,
            height: 28,
            mr: 1,
            alignSelf: "flex-end",
          }}
        />
      )}
      : (
      <Box sx={{ width: 28, mr: 1 }} />)
      <Box
        sx={{
          maxWidth: "60%",
          px: 2,
          py: 1.5,
          borderRadius: 4,
          bgcolor: own ? "#3797F0" : "#EFEFEF",
          color: own ? "#fff" : "#000",
          wordBreak: "break-word",
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            lineHeight: 1.4,
          }}
        >
          {message.text}
        </Typography>
      </Box>
      {own && showAvatar && (
        <Avatar
          src={`${BASE_URL}${message.sender.avatar}`}
          sx={{
            width: 28,
            height: 28,
            ml: 1,
            alignSelf: "flex-end",
          }}
        />
      )}
      : (
      <Box sx={{ width: 28, mr: 1 }} />)
    </Box>
  );
};

export default MessageBubble;
