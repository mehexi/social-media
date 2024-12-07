import {
  BarChart,
  Bookmark,
  CircleSlash,
  Flag,
  Link,
  Pen,
  Pin,
  Share,
  Trash2,
  Undo,
  UserPlus2,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useToast } from "./use-toast";
import { bookMarkPost, pinPost, useDeletePost, followUser } from "@/actions/postActions";
import { useQueryClient } from "@tanstack/react-query";

const useMenu = (tweet, isAuthor, setOpen) => {
  const [isBookmarked, setIsBookmarked] = useState(tweet.isBookmarked);
  const [pinned, setIsPinned] = useState(tweet.isPinned);
  const [isFollowed, setIsFollowed] = useState(tweet.isFollowing);
  const { toast } = useToast();
  const deletePostMutation = useDeletePost();
  const queryClient = useQueryClient();

  // Bookmark toggle
  const toggleBookmark = async () => {
    const added = await bookMarkPost(tweet.id);
    toast({
      title: added ? "Added to Bookmarks" : "Removed from Bookmarks",
    });
  };

  // Follow toggle
  const handleFollow = async () => {
    try {
      const newFollowStatus = await followUser(tweet.user.id);
      setIsFollowed(newFollowStatus);
      queryClient.invalidateQueries(["posts"]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
      });
    }
  };

  // Pin toggle
  const togglePin = async () => {
    const pinned = await pinPost(tweet.id);
    setIsPinned(pinned);
    toast({
      title: pinned ? "Pinned To Profile" : "Unpinned",
    });
  };

  // Copy tweet link
  const tweetLink = () => {
    const link = `https://xwitter.vercel.app/${tweet.user.userName}/status/${tweet.id}`;
    navigator.permissions
      .query({ name: "clipboard-write" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.clipboard
            .writeText(link)
            .then(() => {
              toast({
                title: "Link copied!",
                description: "The tweet link has been copied to your clipboard.",
              });
            })
            .catch(() => {
              toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem copying the link.",
              });
            });
        } else {
          toast({
            title: "Permission Denied",
            description: "Clipboard access is required to copy the link.",
          });
        }
      })
      .catch((error) => {
        console.error("Error checking clipboard permissions", error);
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem checking permissions.",
        });
      });
  };

  // Share tweet
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tweet.user.userName}`,
        text: `${tweet.content}`,
        url: `https://xwitter.vercel.app/${tweet.user.userName}/status/${tweet.id}`,
      })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      toast({
        title: "Share Not Supported",
        description: "Your browser does not support the Web Share API.",
      });
    }
  };

  // Add event listeners for bookmark and follow
  useEffect(() => {
    const handleBookmarkEvent = (event) => {
      const { tweetId, added } = event.detail;
      if (tweet.id === tweetId) {
        setIsBookmarked(added);
      }
    };

    const handleFollowEvent = (event) => {
      const { followId, isFollowing } = event.detail;
      if (tweet.user.id === followId) {
        setIsFollowed(isFollowing);
      }
    };

    window.addEventListener("bookmark", handleBookmarkEvent);
    window.addEventListener("follow", handleFollowEvent);

    return () => {
      window.removeEventListener("bookmark", handleBookmarkEvent);
      window.removeEventListener("follow", handleFollowEvent);
    };
  }, [tweet.id, tweet.user.id]);

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
          label: pinned ? "Already Pinned" : "Pin to Profile",
          icon: !pinned ? Pin : Undo,
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
        label: !isFollowed
          ? `Follow ${tweet.user.userName}`
          : `Unfollow ${tweet.user.userName}`,
        icon: UserPlus2,
        onClick: () => handleFollow(),
      },
      {
        label: isBookmarked
          ? "Remove from Bookmarks"
          : "Add to Bookmarks",
        icon: Bookmark,
        onClick: () => toggleBookmark(),
      },
      {
        label: `Block ${tweet.user.userName}`,
        icon: CircleSlash,
        onClick: () => console.log(`Blocked user: ${tweet.user.id}`),
      },
      {
        label: "Report Tweet",
        icon: Flag,
        class: "text-destructive",
        onClick: () => console.log(`Reported tweet ID: ${tweet.id}`),
      },
    ];
  }, [tweet, isAuthor, pinned, isFollowed, isBookmarked]);

  return menus;
};

export default useMenu;
