import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import useMenu from "@/hooks/useMenu";
import { useUser } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import EditPost from "../subMenu/EditPost";

const SubMenu = ({ post }) => {
  
  const [open, setOpen] = useState(false)
  const { user } = useUser();
  const isAuthor = user?.id === post.userId
  const menu = useMenu(post, isAuthor,setOpen);
  
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
      <EditPopup open={open} setOpen={setOpen} post={post} />
    </DropdownMenu>
  );
};

const Menuitem = ({ data }) => {
  const {icon:Icon} = data
  return (
    <DropdownMenuItem onClick={(e) => {
      e.stopPropagation()
      data.onClick( )
    }} className={data.class}>
      <Icon size='14'/> <h1>{data.label}</h1>
    </DropdownMenuItem>
  );
};

const EditPopup = ({open,setOpen,post}) => {
  
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
      <DialogTitle>
       Edit Your Tweet
      </DialogTitle>
        <EditPost post={post} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default SubMenu;
