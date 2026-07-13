import {
  Avatar,
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";

import {
  closeChat,
  closeConversations,
  getConversations,
  setCurrentConversation,
} from "../../redux/slices/conversationsSlice";

import { BASE_URL } from "../../api/api";
import ChatPanel from "../ChatPanel";

const ConversationsPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();

  const { conversationsOpen, conversations, chatOpen } = useSelector(
    (state) => state.conversations,
  );
  const currentUserId = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    if (conversationsOpen) {
      dispatch(getConversations());
    }
  }, [dispatch, conversationsOpen]);

  return (
    <>
      {conversationsOpen && (
        <Box
          onClick={() => {
            dispatch(closeConversations());
          }}
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
          width: isMobile ? "100%" : "397px",
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
        }}
      >
        <Box p={4}>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Messages
          </Typography>
        </Box>

        <Divider />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {conversations.map((conversation) => {
            const otherUser = conversation.participant;

            return (
              <Box
                key={conversation._id}
                onClick={() => dispatch(setCurrentConversation(conversation))}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 3,
                  py: 2,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#fafafa",
                  },
                }}
              >
                <Avatar
                  src={`${BASE_URL}${otherUser.avatar}`}
                  sx={{
                    width: 56,
                    height: 56,
                    mr: 2,
                  }}
                />

                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {otherUser.username}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" noWrap>
                    {conversation.lastMessage?.text || "No messages"}
                  </Typography>
                </Box>

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
                        bgcolor: "#0095f6",
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
              </Box>
            );
          })}
        </Box>
      </Box>
      {chatOpen && <ChatPanel />}
    </>
  );
};

export default ConversationsPanel;
