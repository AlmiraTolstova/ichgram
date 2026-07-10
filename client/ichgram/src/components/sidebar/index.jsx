import { menu } from "./menu";
import SidebarItem from "../sidebarItem";
import Logo from "../../assets/ICHGRAM.png";
import styles from "./styles.module.css";
import { openCreatePostModal } from "../../redux/slices/userProfileSlice";
import { useDispatch } from "react-redux";
import { Box, Button } from "@mui/material";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { openSearch } from "../../redux/slices/searchSlice";
import {
  getNotifications,
  openNotifications,
} from "../../redux/slices/notificationsSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const actions = {
    createPost: () => dispatch(openCreatePostModal()),
    openSearch: () => dispatch(openSearch()),
    openNotificationsPanel: () => {
      dispatch(openNotifications());
      dispatch(getNotifications());
    },
  };

  return (
    <aside className={styles.sidebar}>
      {/* IMG */}
      <Box
        component="img"
        src={Logo}
        alt="logo"
        sx={{
          width: "6.0625rem",
          ml: "10px",
          mb: 2,
        }}
      ></Box>
      <nav className={styles.navigation}>
        {menu.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            action={item.type === "action" ? actions[item.action] : undefined}
          />
        ))}
      </nav>

      <Button
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
      >
        Logout
      </Button>
    </aside>
  );
};

export default Sidebar;
