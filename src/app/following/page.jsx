import TabSwitcher from "@/components/TabSwitcher/TabSwitcher";
import { Separator } from "@/components/ui/separator";
import FollowBody from "./Componants/FollowBody";
import PostBody from "../(feed)/componants/PostBody";
import PostBox from "../(feed)/componants/PostBox";

export default async function FollowFeed() {
  return (
    <section className="flex flex-col items-center h-screen overflow-x-auto p-0">
      <TabSwitcher />
      <Separator />
      <FollowBody />
    </section>
  );
}
