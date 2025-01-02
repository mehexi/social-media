import { getTweetById } from "@/actions/getTweet";
import BackButton from "./componants/BackButton";
import SinglePost from "@/app/(feed)/componants/SinglePost";
import { getUserData } from "@/actions/getUserData";
import ReplaySinglePost from "./componants/ReplaySinglePost";
import TweetPostReplies from "./componants/TweetPostReplies";

export async function generateMetadata({ params }) {
  const param = await params
  const { tweetId } = param;
  const tweet = await getTweetById(tweetId);

  return {
    title: tweet.content ? `${tweet.content.substring(0, 50)} / Y` : "Tweet / Y",
    description: tweet.content || "View this tweet on Y.",
  };
}

const page = async ({ params }) => {
  const currentUser = await getUserData();
  const { tweetId } = await params;
  const tweets = await getTweetById(tweetId);
  return (
    <section className="flex flex-col items-center overflow-x-auto mb-24">
      <BackButton />
      <div className="w-full">
        <SinglePost post={tweets} mainTweet={true} />
      </div>
      <TweetPostReplies tweets={tweets} currentUser={currentUser} />
    </section>
  );
};

export default page;
