export const dynamic = "force-dynamic";

import MobileNav from "@/components/sideBar/MobileNav";
import SideBar from "@/components/sideBar/SideBar";
import SideFollow from "./componants/SideFollow";

export const metadata = {
  title: "Home / Y",
  description: "Generated by create next app"
};

export default async function FeedLayout({ children }) {
  return (
    <>
      <section className="grid grid-cols-12 max-w-6xl mx-auto">
        <SideBar />
        <div className="col-span-7 max-md:col-span-11 max-sm:col-span-12  border-r">
          {children}
          <MobileNav />
        </div>
        <div className="col-span-3 max-sm:hidden h-screen overflow-x-auto">
          <SideFollow />
        </div>
      </section>
    </>
  );
}
