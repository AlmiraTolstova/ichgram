import { Avatar, Box, Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeNotifications } from "../../redux/slices/notificationsSlice";

const notifications = [
  {
    id: 1,
    user: "sashaa",
    action: "liked your photo.",
    time: "2 d",
    avatar: "/avatar.jpg",
    post: "/post.jpg",
  },
  {
    id: 2,
    user: "sashaa",
    action: "commented your photo.",
    time: "2 wek",
    avatar: "/avatar.jpg",
    post: "/post.jpg",
  },
  {
    id: 3,
    user: "sashaa",
    action: "started following.",
    time: "2 d",
    avatar: "/avatar.jpg",
    post: "/post.jpg",
  },
];

function NotificationsPanel() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.notifications);

  return (
    <>
      {isOpen && (
        <Box
          onClick={() => dispatch(closeNotifications())}
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
          left: "245px",
          width: "397px",
          height: "100vh",
          bgcolor: "#fff",
          borderTopRightRadius: "16px",
          borderBottomRightRadius: "16px",
          boxShadow: "0 0 20px rgba(0,0,0,.12)",
          transform: isOpen ? "translateX(0)" : "translateX(-200%)",
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
            Notifications
          </Typography>
        </Box>

        <Divider />

        <Box
          sx={{
            p: 4,
            overflowY: "auto",
            flex: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 16,
              mb: 3,
            }}
          >
            New
          </Typography>

          {notifications.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Avatar
                src={item.avatar}
                sx={{
                  width: 56,
                  height: 56,
                  mr: 2,
                }}
              />

              <Typography
                sx={{
                  flex: 1,
                  fontSize: 15,
                  lineHeight: 1.35,
                }}
              >
                <Box component="span" fontWeight={700}>
                  {item.user}
                </Box>{" "}
                {item.action}
                <Box
                  component="span"
                  sx={{
                    color: "#8E8E8E",
                  }}
                >
                  {" "}
                  {item.time}
                </Box>
              </Typography>

              <Box
                component="img"
                src={item.post}
                alt=""
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 1,
                  objectFit: "cover",
                  ml: 2,
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
export default NotificationsPanel;
