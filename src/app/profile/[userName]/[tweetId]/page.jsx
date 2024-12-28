import { getTweetById } from "@/actions/getTweet";
import BackButton from "./componants/BackButton";
import TweetReplay from "./componants/TweetReplay";
import SinglePost from "@/app/(feed)/componants/SinglePost";

const page = async ({ params }) => {
  const { tweetId } = await params;
  const tweets = await getTweetById(tweetId);
    console.log(tweets)
  return (
    <section className="flex flex-col items-center h-screen overflow-x-auto">
      <BackButton />
      <div className="w-full">
        <SinglePost post={tweets} />
      </div>
      <div>
        <h1>add repely here</h1>
      </div>
      {tweets.replies.length > 0 &&
        tweets.replies.map((tweetReplay) => (
          <TweetReplay key={tweetReplay.id} replay={tweetReplay} />
        ))}
    </section>
  );
};

export default page;
