import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import React from "react";
import SuggestedPostItem from "./SuggestedPostItem";
import { useSearchParams } from "next/navigation";
import SearchPosts from "./SearchPosts";
import SinglePost from "@/app/(feed)/componants/SinglePost";

const SuggestedPosts = ({ tweets }) => {
  const searchParam = useSearchParams();
  const query = searchParam.get("q");

  console.log(tweets);

  return (
    <Card className="w-full bg-background border-none">
      <CardHeader>
        <h1 className="text-secondary-foreground/50">
          {!query ? (
            "Suggested Post Only for you"
          ) : (
            <h1>
              Showing Result For: <span className="text-primary">{query}</span>
            </h1>
          )}
        </h1>
      </CardHeader>
      <div>
        {!query ? (
          <Carousel className="rounded">
            <CarouselContent className="ml-4">
              {tweets.map((tweet) => (
                <SuggestedPostItem key={tweet.id} tweet={tweet} />
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="flex flex-col">
            {tweets.map((tweet) => (
              <SinglePost key={tweet.id} post={tweet} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SuggestedPosts;
