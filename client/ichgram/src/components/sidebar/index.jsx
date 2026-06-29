import { menu } from "./menu";
import SidebarItem from "../sidebarItem";

import styles from "./styles.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navigation}>
        {menu.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
