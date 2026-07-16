import { Box, Container, Stack, Typography } from "@mui/material";
import { menu } from "../sidebar/menu";
import SidebarItemFooter from "../sidebarItemFooter";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openCreatePostModal } from "../../redux/slices/userProfileSlice";
import { openSearch } from "../../redux/slices/searchSlice";
import {
  getNotifications,
  openNotifications,
  readNotifications,
} from "../../redux/slices/notificationsSlice";
import { openConversations } from "../../redux/slices/conversationsSlice";

const links = [
  { label: "Home", href: "#" },
  { label: "Search", href: "#" },
  { label: "Explore", href: "#" },
  { label: "Messages", href: "#" },
  { label: "Notifications", href: "#" },
  { label: "Create", href: "#" },
];

function Footer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const actions = {
    createPost: () => dispatch(openCreatePostModal()),
    openSearch: () => dispatch(openSearch()),
    openNotificationsPanel: () => {
      dispatch(openNotifications());
      dispatch(getNotifications());
      dispatch(readNotifications());
    },
    openConversations: () => dispatch(openConversations()),
  };
  return (
    <Box
      component="footer"
      sx={{
        borderColor: "divider",
        bgcolor: "#fff",
      }}
    >
      <Container
        sx={{
          width: {
            xs: "100%",
            sm: "28rem",
            md: "30.875rem",
          },
          pt: "1.5rem",
          pb: "3rem",
        }}
      >
        <Stack
          direction="row"
          sx={{
            display: "flex",
            flexWrap: {
              //xs: "wrap",
              md: "nowrap",
            },
            gap: { xs: 0 },
            justifyContent: "space-between",
          }}
        >
          {menu.map((item) => (
            <SidebarItemFooter
              key={item.id}
              item={item}
              action={item.type === "action" ? actions[item.action] : undefined}
            />
          ))}
        </Stack>

        <Typography
          color="text.secondary"
          align="center"
          sx={{
            marginTop: "3rem",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            display: "flex",
            justifyContent: "center",
            color: "#737373",
          }}
        >
          © 2026 ICHgram
        </Typography>
      </Container>
    </Box>
  );
}
export default Footer;
