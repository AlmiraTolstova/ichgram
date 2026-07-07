import { menu } from "./menu";
import SidebarItem from "../sidebarItem";

import styles from "./styles.module.css";
import { openCreatePostModal } from "../../redux/slices/userProfileSlice";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { openSearch } from "../../redux/slices/searchSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const actions = {
    createPost: () => dispatch(openCreatePostModal()),
    openSearch: () => dispatch(openSearch()),
  };

  return (
    <aside className={styles.sidebar}>
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
