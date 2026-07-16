import { Avatar, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { setTargetUserID } from "../../redux/slices/otherProfileSlice";
import { closeConversations } from "../../redux/slices/conversationsSlice";
import AppButton from "../appButton";

const ChatHeader = () => {
  const { currentConversation } = useSelector((state) => state.conversations);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.auth.user.id);

  if (!currentConversation) return null;

  const user = currentConversation.participant;
  if (!user) return null;
  return (
    <Box
      sx={{
        borderBottom: "1px solid #DBDBDB",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 3,
        textAlign: "center",
      }}
    >
      <Avatar
        src={`${BASE_URL}${user.avatar}`}
        sx={{ width: "96px", height: "96px", mb: "1rem" }}
      />

      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "20px",
          lineHeight: "25px",
          color: "#000000",
        }}
      >
        {user.username}
      </Typography>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "18px",
          color: "#737373",
          mb: "1rem",
        }}
      >
        {user.fullname}
      </Typography>

      <AppButton
        appearance="gray"
        size="medium"
        onClick={() => {
          dispatch(setTargetUserID(user._id));
          dispatch(closeConversations());
          navigate("/otherprofile");
        }}
      >
        view profile
      </AppButton>
    </Box>
  );
};

export default ChatHeader;
