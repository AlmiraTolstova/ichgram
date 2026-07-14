import { NavLink } from "react-router-dom";

import styles from "./styles.module.css";
import { useSelector } from "react-redux";

const SidebarItem = ({ item, action }) => {
  const OutlineIcon = item.outline;
  const FillIcon = item.fill;
  const unreadNotifications = useSelector(
    (state) => state.notifications.unread_notificiatioon_count,
  );
  const unreadMessages = useSelector(
    (state) => state.conversations.unreadMessages,
  );
  console.log(unreadMessages);

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
        {item.hasNotificationBadge && unreadNotifications > 0 && (
          <span className={styles.badge}>
            {unreadNotifications > 9 ? "9+" : unreadNotifications}
          </span>
        )}
        {item.hasMessageBadge && unreadMessages > 0 && (
          <span className={styles.badge}>
            {unreadMessages > 9 ? "9+" : unreadMessages}
          </span>
        )}
      </button>
    );
  }
};

export default SidebarItem;
