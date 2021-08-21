// icons
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";

// components
import Home from "../pages/Home";
import WishList from "../pages/WishList";

// interface
import RouteItem from "../utils/RouteItem";

// define app routes
export const routes: Array<RouteItem> = [
  {
    key: "router-home",
    title: "Home",
    tooltip: "Home",
    path: "/home",
    enabled: true,
    component: Home,
    icon: HomeIcon,
    appendDivider: true,
  },
  {
    key: "router-wish-list",
    title: "Wish List",
    tooltip: "wishlist",
    path: "/wishlist",
    enabled: true,
    component: WishList,
    icon: ListIcon,
    appendDivider: true,
  },
];
