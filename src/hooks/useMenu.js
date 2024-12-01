import useDeletePost from "@/actions/postActions";
import { BarChart, Blocks, Bookmark, CircleSlash, Flag, Link, Pen, Share, Trash2, UserPlus2 } from "lucide-react";
import { useMemo } from "react";

const useMenu = (tweet, isAuthor) => {

  const deletePostMutation = useDeletePost();

  const menus = useMemo(() => {
    const commonMenus = [
      {
        label: "Copy Link to Tweet",
        icon: Link,
        onClick: () => console.log(`Link copied for tweet ID: ${tweet.id}`),
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
          onClick: () => console.log(`Edit tweet ID: ${tweet.id}`),
        },
        {
          label: "View Analytics",
          icon: BarChart,
          onClick: () => console.log(`Viewing analytics for tweet ID: ${tweet.id}`),
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
        onClick: () => console.log(`Followed user ID: ${tweet.authorId}`)
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
