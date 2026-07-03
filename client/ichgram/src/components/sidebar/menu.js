import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBoxIcon from "@mui/icons-material/AddBox";
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
    path: "/",
    outline: HomeSvgOutline,
    fill: HomeSvgFill,
  },

  {
    id: 2,
    type: "link",
    title: "Search",
    path: "/search",
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
    type: "link",
    title: "Messages",
    path: "/messages",
    outline: MessagesSvgOutline,
    fill: MessageSvgFill,
  },
  {
    id: 5,
    type: "link",
    title: "Notification",
    path: "/notification",
    outline: NotificationSvgOutline,
    fill: FavoriteIcon,
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
    outline: NotificationSvgOutline,
    fill: FavoriteIcon,
  },
];
