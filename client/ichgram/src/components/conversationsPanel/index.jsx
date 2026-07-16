import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";

import {
  closeConversations,
  getConversations,
  getMessages,
  readConversation,
  setCurrentConversation,
} from "../../redux/slices/conversationsSlice";

import { BASE_URL } from "../../api/api";
import ChatPanel from "../ChatPanel";

const ConversationsPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();

  const { conversationsOpen, conversations, chatOpen, currentConversation } =
    useSelector((state) => state.conversations);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (conversationsOpen) {
      dispatch(getConversations());
    }
  }, [dispatch, conversationsOpen]);

  return (
    <>
      {conversationsOpen && (
        <Box
          onClick={() => dispatch(closeConversations())}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1,
          }}
        />
      )}

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: isMobile ? 0 : "245px",
          width: isMobile ? "90%" : "397px",
          height: "100vh",
          bgcolor: "#fff",
          borderTopRightRadius: isMobile ? 0 : "16px",
          borderBottomRightRadius: isMobile ? 0 : "16px",
          boxShadow: "0 0 20px rgba(0,0,0,.12)",
          transform: conversationsOpen ? "translateX(0)" : "translateX(-200%)",
          transition: ".2s",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          paddingTop: 3,
        }}
      >
        <Box px={4} pb={2}>
          <Typography fontSize={24} fontWeight={700}>
            {user.username}
          </Typography>
        </Box>

        <List
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 0,
          }}
        >
          {conversations.map((conversation) => {
            const otherUser = conversation.participant;

            return (
              <ListItemButton
                key={conversation._id}
                selected={currentConversation?._id === conversation._id}
                onClick={() => {
                  dispatch(setCurrentConversation(conversation));
                  dispatch(getMessages(conversation._id));
                  dispatch(readConversation(conversation._id));
                }}
                sx={{
                  px: 3,
                  py: 1.5,
                  alignItems: "center",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={`${BASE_URL}${otherUser.avatar}`}
                    sx={{
                      width: 56,
                      height: 56,
                    }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography fontWeight={600}>
                      {otherUser.username}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {conversation.lastMessage?.text || "No messages"}
                    </Typography>
                  }
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    ml: 2,
                  }}
                >
                  {conversation.lastMessage && (
                    <Typography variant="caption" color="text.secondary">
                      {dayjs(conversation.lastMessage.createdAt).format(
                        "HH:mm",
                      )}
                    </Typography>
                  )}

                  {conversation.unreadCount > 0 && (
                    <Box
                      sx={{
                        mt: 1,
                        minWidth: 20,
                        height: 20,
                        px: 0.8,
                        borderRadius: "999px",
                        bgcolor: "primary.main",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {conversation.unreadCount}
                    </Box>
                  )}
                </Box>
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {chatOpen && <ChatPanel />}
    </>
  );
};

export default ConversationsPanel;
