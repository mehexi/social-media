import TabSwitcher from "@/components/TabSwitcher/TabSwitcher";
import MediaBody from "./componants/MediaBody";
import { Separator } from "@/components/ui/separator";

export default async  function Home() {
  return (
    <section className="flex flex-col items-center h-screen overflow-x-auto p-0 mb-12">
      <TabSwitcher/>
      <Separator/>
      <MediaBody />
    </section>
  );
}
