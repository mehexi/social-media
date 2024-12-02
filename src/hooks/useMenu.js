import useDeletePost from "@/actions/postActions";
import {
  BarChart,
  Blocks,
  Bookmark,
  CircleSlash,
  Flag,
  Link,
  Pen,
  Share,
  Trash2,
  UserPlus2,
} from "lucide-react";
import { useMemo } from "react";
import { useToast } from "./use-toast";

const useMenu = (tweet, isAuthor, setOpen) => {
  const { toast } = useToast();
  const deletePostMutation = useDeletePost();
  const tweetLink = () => {
    const link = `https://xwitter.vercel.app/${tweet.user.userName}/status/${tweet.id}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "The tweet link has been copied to your clipboard.",
          className: "text-sm"
        });
      })
      .catch(() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem copying the link.",
        });
      });
  };

  const menus = useMemo(() => {
    const commonMenus = [
      {
        label: "Copy Link to Tweet",
        icon: Link,
        onClick: () => tweetLink(),
      },
      {
        label: "Share Tweet",
        icon: Share,
        onClick: () => console.log("Share options opened"),
      },
    ];

    if (isAuthor) {
      return [
        ...commonMenus,
        {
          label: "Pin to Profile",
          icon: BarChart,
          onClick: () => console.log("Tweet pinned"),
        },
        {
          label: "Edit",
          icon: Pen,
          onClick: () => setOpen(true),
        },
        {
          label: "View Analytics",
          icon: BarChart,
          onClick: () =>
            console.log(`Viewing analytics for tweet ID: ${tweet.id}`),
        },
        {
          label: "Delete",
          icon: Trash2,
          class: "text-destructive",
          onClick: () => deletePostMutation.mutate(tweet.id),
        },
      ];
    }

    return [
      ...commonMenus,
      {
        label: `Follow ${tweet.user.userName}`,
        icon: UserPlus2,
        onClick: () => console.log(`Followed user ID: ${tweet.authorId}`),
      },
      {
        label: "Add to Bookmarks",
        icon: Bookmark,
        onClick: () => console.log(`Bookmark added for tweet ID: ${tweet.id}`),
      },
      {
        label: `Block ${tweet.user.userName}`,
        icon: CircleSlash,
        class: "",
        onClick: () => console.log(`Blocked user: ${tweet.userId}`),
      },
      {
        label: "Report Tweet",
        icon: Flag,
        class: "text-destructive",
        onClick: () => console.log(`Reported tweet ID: ${tweet.id}`),
      },
    ];
  }, [tweet, isAuthor]);

  return menus;
};

export default useMenu;
