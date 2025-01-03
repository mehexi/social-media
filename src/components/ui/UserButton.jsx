import { useClerk, useUser } from "@clerk/nextjs";
import React from "react";
import { UserButton as UserIcon } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "./dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import ToggleDark from "../darkmode/ToggleDark";
import { ThemeColorToggle } from "../darkmode/ThemeColor";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

const UserButton = () => {
  const user = useUser();
  const router = useRouter()
  const { signOut, openUserProfile } = useClerk();

  const handleProfileClick = () => {
    router.push('/settings')
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  if (!user.isLoaded || !user.isSignedIn) {
    return null;
  }
  const currentUser = user?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="select-none outline-none capitalize">
        <button className=" bg-none rounded-full flex items-center justify-start px-1 hover:bg-popover w-fit">
          <div className="flex gap-3 items-center w-fit">
            <UserIcon />
            <div className="text-start flex flex-col max-md:hidden">
              <h1 className="text-foreground text-sm">
                {currentUser.fullName}
              </h1>
              <p className="text-[10px] text-muted-foreground">
                @{currentUser.username}
              </p>
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 capitalize">
        <DropdownMenuLabel>
          <div className="flex justify-between items-center">
            <h1>Quick Settings</h1> 
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleProfileClick}>
            <Settings/>
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="py-2">
          <ThemeColorToggle/>
        </div >
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
