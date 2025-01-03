"use client"
const {
  KeyRoundIcon,
  Brush,
  HelpCircle,
  UserRoundCog,
} = require("lucide-react");
const { useMemo } = require("react");

export const useSettings = () => {
  const settings = useMemo(
    () => [
      {
        icon: KeyRoundIcon,
        label: "Change Your Password",
        des: "Change Your Password at any time",
        href: "/settings/password",
      },
      {
        icon: Brush,
        label: "Change Your Display",
        des: "Manage your Color, and background. These Settings effect all the Xwitter Accounts",
        href: "/settings/display",
      },
      {
        icon: HelpCircle,
        label: "Found a Issue",
        des: "If you have found a issue, please report it to us",
        href: "/settings/issue",
      },
      {
        icon: UserRoundCog,
        label: "See The dev",
        des: "See the developer of this app, it was for fun",
        className: 'mt-auto',
        href: "/profile/mehexi",
      },
    ],
    []
    );
    return settings
};
