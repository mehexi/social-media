import { Bell, BookmarkIcon, Home, MessageCircleCodeIcon, Search, UserCircleIcon } from "lucide-react"

const { usePathname } = require("next/navigation")
const { useMemo } = require("react")

const useRoute = () => {
    const pathName = usePathname()

    const routes = useMemo(() => [
        {
            label: 'Home',
            href: '/',
            icon: Home,
            active: pathName === "/" || pathName === "/following",
        },
        {
            label: 'explore',
            href: '/explore',
            icon: Search,
            active: pathName === "/explore"
        },
        {
            label: 'notification',
            href: '/notification',
            icon: Bell,
            active: pathName === "/notification"
        },
        {
            label: 'messages',
            href: '/messages',
            icon: MessageCircleCodeIcon,
            active: pathName === "/messages"
        },
        {
            label: 'bookmark',
            href: '/bookmark',
            icon: BookmarkIcon,
            active: pathName === "/bookmark"
        },
        {
            label: 'profile',
            href: '/profile',
            icon: UserCircleIcon,
            active: pathName === "/profile"
        }
    ], [pathName])
    
    return routes
}

export default useRoute