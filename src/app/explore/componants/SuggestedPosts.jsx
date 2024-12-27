import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import SuggestedPostItem from "./SuggestedPostItem";
import { useSearchParams } from "next/navigation";
import SinglePost from "@/app/(feed)/componants/SinglePost";
import { Button } from "@/components/ui/button";
import { Search, User2 } from "lucide-react";

const SuggestedPosts = ({ tweets }) => {
  const searchParam = useSearchParams();
  const query = searchParam.get("q");
  let parts = [];

  if (query.startsWith("from:")) {
    parts = query.split("from:")[1].trim().split(" ");
  }

  console.log(parts);

  return (
    <Card className="border-none w-full bg-background">
      <div className="p-3 ">
        <div className="text-secondary-foreground/50">
          {!query ? (
            <h1>Suggested Post Only for you</h1>
          ) : parts < 1 ? (
            <div>
              Showing Result For: <span className="text-primary">{query}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              {" "}
              Showing results for
              {parts[0] && (
                <h1
                  className=" rounded-full capitalize flex items-center gap-1 text-primary"
                  variant="outline"
                >
                  {parts[0]}
                </h1>
              )}
              {parts[1] && <h1>: {parts[1]}</h1>}
            </div>
          )}
        </div>
      </div>
      <div>
        {!query ? (
          <Carousel className="rounded">
            <CarouselContent className="ml-4">
              {tweets.map((tweet) => (
                <SuggestedPostItem key={tweet.id} tweet={tweet} />
              ))}
            </CarouselContent>
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
