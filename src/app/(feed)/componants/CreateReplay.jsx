import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormattedContent from "@/components/ui/FormatContent";
import FormattedDate from "@/components/ui/FormatedTime";
import React from "react";

const CreateReplay = ({ currentPost }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Retweet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>{" "}
              <div>
                  <div className="text-primary"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReplay;
