import { menu } from "./menu";
import SidebarItem from "../sidebarItem";

import styles from "./styles.module.css";
import { openCreatePostModal } from "../../redux/slices/userProfileSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navigation}>
        {menu.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            action={() => dispatch(openCreatePostModal())}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
