import { NavLink } from "react-router-dom";

import styles from "./styles.module.css";

const SidebarItem = ({ item }) => {
  const OutlineIcon = item.outline;
  const FillIcon = item.fill;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `${styles.item} ${isActive ? styles.active : ""}`
      }
    >
      <span className={styles.outline}>
        <OutlineIcon />
      </span>

      <span className={styles.fill}>
        <FillIcon />
      </span>

      <span className={styles.title}>{item.title}</span>
    </NavLink>
  );
};

export default SidebarItem;
