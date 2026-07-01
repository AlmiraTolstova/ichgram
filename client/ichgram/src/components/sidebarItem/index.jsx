import { NavLink } from "react-router-dom";

import styles from "./styles.module.css";

const SidebarItem = ({ item, action }) => {
  const OutlineIcon = item.outline;
  const FillIcon = item.fill;

  if (item.type === "link") {
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
  } else {
    return (
      <button className={styles.item} onClick={action}>
        <span className={styles.outline}>
          <OutlineIcon />
        </span>

        <span className={styles.fill}>
          <FillIcon />
        </span>

        <span>{item.title}</span>
      </button>
    );
  }
};

export default SidebarItem;
