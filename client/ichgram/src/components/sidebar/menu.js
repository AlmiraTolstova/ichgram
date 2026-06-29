import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import SearchIcon from "@mui/icons-material/Search";

import ExploreIcon from "@mui/icons-material/Explore";
import {
  CreateSvgOutline,
  ExploreSvgOutline,
  HomeSvgOutline,
  MessagesSvgOutline,
  NotificationSvgOutline,
  SearchSvgOutline,
} from "../icons";
export const menu = [
  {
    id: 1,
    title: "Home",
    path: "/",
    outline: HomeSvgOutline,
    fill: HomeFilledIcon,
  },
  {
    id: 2,
    title: "Search",
    path: "/search",
    outline: SearchSvgOutline,
    fill: SearchIcon,
  },
  {
    id: 3,
    title: "Explore",
    path: "/explore",
    outline: ExploreSvgOutline,
    fill: ExploreIcon,
  },
  {
    id: 4,
    title: "Messages",
    path: "/messages",
    outline: MessagesSvgOutline,
    fill: ExploreIcon,
  },
  {
    id: 5,
    title: "Notification",
    path: "/notification",
    outline: NotificationSvgOutline,
    fill: ExploreIcon,
  },
  {
    id: 6,
    title: "Create",
    path: "/create",
    outline: CreateSvgOutline,
    fill: ExploreIcon,
  },
];
