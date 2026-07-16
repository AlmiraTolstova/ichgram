import { Avatar, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeNotifications } from "../../redux/slices/notificationsSlice";
import { useEffect } from "react";
import { getNotifications } from "../../redux/slices/notificationsSlice";
import { BASE_URL } from "../../api/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { openExistPostModal } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import { setTargetUserID } from "../../redux/slices/otherProfileSlice";

dayjs.extend(relativeTime);

function NotificationsPanel({ isMobile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, notifications_list } = useSelector(
    (state) => state.notifications,
  );
  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);
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
          border: "1px solid red",
          position: "fixed",
          top: 0,
          padding: "1.5rem",
          left: isMobile ? 0 : "245px",
          width: isMobile ? "90%" : "397px",
          height: "100vh",
          bgcolor: "#fff",
          borderTopRightRadius: isMobile ? 0 : "1rem",
          borderBottomRightRadius: isMobile ? 0 : "1rem",
          boxShadow: "0 0 20px rgba(0,0,0,.12)",
          transform: isOpen ? "translateX(0)" : "translateX(-200%)",
          transition: ".2s",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "30px",
              color: "#000000",
              marginBottom: "1rem",
            }}
          >
            Notifications
          </Typography>
        </Box>

        <Box
          sx={{
            overflowY: "auto",
            flex: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "20px",
              color: "#000000",
              mb: "2rem",
            }}
          >
            New
          </Typography>

          {notifications_list?.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
              onClick={() => {
                console.log(item);
                if (item.type === "follow") {
                  dispatch(closeNotifications());

                  dispatch(setTargetUserID(item.sender._id));
                  navigate("/otherprofile");

                  return;
                }

                if (item.post) {
                  dispatch(openExistPostModal(item.post));
                }

                dispatch(closeNotifications());
              }}
            >
              <Avatar
                src={`${BASE_URL}${item.sender.avatar}`}
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
                  {item.sender.username}
                </Box>{" "}
                {item.type === "like"
                  ? "liked your photo"
                  : item.type === "comment"
                    ? "commented your photo"
                    : item.type === "follow"
                      ? "started following you"
                      : ""}
                <Box
                  component="span"
                  sx={{
                    color: "#8E8E8E",
                  }}
                >
                  {" "}
                  {dayjs(item.updatedAt).fromNow()}
                </Box>
              </Typography>
              {item.post && (
                <Box
                  component="img"
                  src={`${BASE_URL}${item.post.image}`}
                  alt=""
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 1,
                    objectFit: "cover",
                    ml: 2,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
export default NotificationsPanel;
