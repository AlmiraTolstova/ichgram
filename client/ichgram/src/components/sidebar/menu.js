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
    title: "Home",
    path: "/",
    outline: HomeSvgOutline,
    fill: HomeSvgFill,
  },

  {
    id: 2,
    title: "Search",
    path: "/search",
    outline: SearchSvgOutline,
    fill: SearchSvgFill,
  },

  {
    id: 3,
    title: "Explore",
    path: "/explore",
    outline: ExploreSvgOutline,
    fill: ExploreSvgFill,
  },

  {
    id: 4,
    title: "Messages",
    path: "/messages",
    outline: MessagesSvgOutline,
    fill: MessageSvgFill,
  },
  {
    id: 5,
    title: "Notification",
    path: "/notification",
    outline: NotificationSvgOutline,
    fill: FavoriteIcon,
  },
  {
    id: 6,
    title: "Create",
    path: "/create",
    outline: CreateSvgOutline,
    fill: AddBoxIcon,
  },
];
