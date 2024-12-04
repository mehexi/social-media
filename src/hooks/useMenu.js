import {
  BarChart,
  Blocks,
  Bookmark,
  CircleSlash,
  Flag,
  Link,
  Pen,
  Pin,
  Share,
  Trash2,
  UserPlus2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useToast } from "./use-toast";
import { bookMarkPost, pinPost, useDeletePost } from "@/actions/postActions";

const useMenu = (tweet, isAuthor, setOpen) => {
  const [isBookmarked, setIsBookmarked] = useState(tweet.isBookmarked);
  const [pinned,setIsPinned] = useState()
  const { toast } = useToast();
  const deletePostMutation = useDeletePost();
  
  //toggle bm
  const toggleBookmark = async () => {
    const added = await bookMarkPost(tweet.id);
    setIsBookmarked(added);
    toast({
      title: added ? "Added to Bookmarks" : "Removed from Bookmarks",
    });
  };

  //copy to clipboard
  const tweetLink = () => {
    const link = `https://xwitter.vercel.app/${tweet.user.userName}/status/${tweet.id}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "The tweet link has been copied to your clipboard.",
          className: "text-sm",
        });
      })
      .catch(() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem copying the link.",
        });
      });
  };
  
  //share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tweet.user.userName}`,
        text: `${tweet.content}`,
        url:  `https://xwitter.vercel.app/${tweet.user.userName}/status/${tweet.id}`,
      })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.error('Error sharing', error));
    } else {
      console.log('Share API not supported on this device/browser.');
    }
  };

  const togglePin = async() => {
    const pinned = await pinPost(tweet.id)  
    setIsPinned(pinned)
  }

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
        onClick: () => handleShare(),
      },
    ];

    if (isAuthor) {
      return [
        ...commonMenus,
        {
          label: "Pin to Profile",
          icon: Pin,
          onClick: () => togglePin(),
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
        label: isBookmarked ? "Remove from Bookmarks" : "Add to Bookmarks",
        icon: Bookmark,
        onClick: () => toggleBookmark(),
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
  }, [tweet, isAuthor,deletePostMutation,setOpen]);

  return menus;
};

export default useMenu;
