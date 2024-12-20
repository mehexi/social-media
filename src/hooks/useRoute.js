import {
  Bell,
  BookmarkIcon,
  Home,
  MessageCircleCodeIcon,
  Search,
  UserCircleIcon
} from "lucide-react";
import { useNotifications } from "./useNotification";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const useRoute = () => {
  const pathName = usePathname();
  const { notifications: liveNotifications } = useNotifications(); // Correctly destructured

  const routes = useMemo(
    () => [
      {
        label: "Home",
        href: "/",
        icon: Home,
        active: pathName === "/" || pathName === "/following"
      },
      {
        label: "Explore",
        href: "/explore",
        icon: Search,
        active: pathName === "/explore"
      },
      {
        label: "Notifications",
        href: "/notification",
        icon: Bell,
        new: liveNotifications.length > 0, // Fixed reference
        active: pathName === "/notification"
      },
      {
        label: "Messages",
        href: "/messages",
        new: false,
        icon: MessageCircleCodeIcon,
        active: pathName === "/messages"
      },
      {
        label: "Bookmarks",
        href: "/bookmark",
        icon: BookmarkIcon,
        active: pathName === "/bookmark"
      },
      {
        label: "Profile",
        href: "/profile",
        icon: UserCircleIcon,
        active: pathName === "/profile"
      }
    ],
    [pathName, liveNotifications] 
  );

  return routes;
};

export default useRoute;
