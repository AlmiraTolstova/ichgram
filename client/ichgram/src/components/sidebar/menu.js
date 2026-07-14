import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  CreateSvgOutline,
  ExploreSvgFill,
  ExploreSvgOutline,
  HomeSvgFill,
  HomeSvgOutline,
  MessagesSvgOutline,
  NotificationSvgOutline,
  SearchSvgFill,
  SearchSvgOutline,
  MessageSvgFill,
} from "../icons";
export const menu = [
  {
    id: 1,
    type: "link",
    title: "Home",
    path: "/home",
    outline: HomeSvgOutline,
    fill: HomeSvgFill,
  },

  {
    id: 2,
    type: "action",
    title: "Search",
    path: "/search",
    action: "openSearch",
    outline: SearchSvgOutline,
    fill: SearchSvgFill,
  },

  {
    id: 3,
    type: "link",
    title: "Explore",
    path: "/explore",
    outline: ExploreSvgOutline,
    fill: ExploreSvgFill,
  },

  {
    id: 4,
    type: "action",
    action: "openConversations",
    title: "Messages",
    path: "/messages",
    outline: MessagesSvgOutline,
    fill: MessageSvgFill,
    hasMessageBadge: true,
  },
  {
    id: 5,
    type: "action",
    action: "openNotificationsPanel",
    title: "Notifications",
    path: "/notification",
    outline: NotificationSvgOutline,
    fill: FavoriteIcon,
    hasNotificationBadge: true,
  },
  {
    id: 6,
    type: "action",
    action: "createPost",
    title: "Create",
    path: "/create",
    outline: CreateSvgOutline,
    fill: AddBoxIcon,
  },
  {
    id: 7,
    type: "link",
    title: "Profile",
    path: "/profile",
    outline: AccountCircleOutlinedIcon,
    fill: AccountCircleIcon,
  },
];
