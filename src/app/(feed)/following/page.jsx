import TabSwitcher from "@/components/TabSwitcher/TabSwitcher";
import { Separator } from "@/components/ui/separator";
import FollowBody from "./Componants/FollowBody";

export default async function FollowFeed() {
  return (
    <section className="flex flex-col items-center h-screen overflow-x-auto p-0">
      <TabSwitcher />
      <Separator />
      <FollowBody />
    </section>
  );
}
