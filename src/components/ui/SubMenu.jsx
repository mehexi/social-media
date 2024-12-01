import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import useMenu from "@/hooks/useMenu";
import { useUser } from "@clerk/nextjs";

const SubMenu = ({ post }) => {
  
  const { user } = useUser();
  const isAuthor = user?.id === post.userId
  const menu = useMenu(post, isAuthor);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <EllipsisVertical size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {menu.map((item, index) => (
          <Menuitem key={index} data={item} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Menuitem = ({ data }) => {
  const {icon:Icon} = data
  return (
    <DropdownMenuItem onClick={data.onClick} className={data.class}>
      <Icon size='14'/> <h1>{data.label}</h1>
    </DropdownMenuItem>
  );
};

export default SubMenu;
