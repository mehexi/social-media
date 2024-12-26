import {
  Bell,
  BookmarkIcon,
  Home,
  MessageCircleCodeIcon,
  Search,
  User2
} from "lucide-react";
import { useNotifications } from "./useNotification";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useUser } from "@clerk/nextjs";

const useRoute = () => {
  const { user, isLoaded } = useUser(); // Destructure isLoaded to check if the user data has finished loading
  const pathName = usePathname();
  const { notifications: liveNotifications } = useNotifications(); 

  const routes = useMemo(() => {
    const baseRoutes = [
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
        new: liveNotifications.length > 0,
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
    ];

    if (isLoaded && user) {
      baseRoutes.push({
        label: "Profile",
        href: `/profile/${user.username}`,
        icon: User2,
        active: pathName === `/profile/${user.username}`
      });
    } else {
      baseRoutes.push({
        label: "Profile",
        href: "/profile",
        icon: User2,
        active: pathName === "/profile"
      });
    }

    return baseRoutes;
  }, [pathName, liveNotifications, user, isLoaded]); // Ensure all dependencies are included

  return routes;
};

export default useRoute;
