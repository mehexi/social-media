import MobileNav from "@/components/sideBar/MobileNav";
import SideBar from "@/components/sideBar/SideBar";

export default function ExploreLayout({ children }) {
  return (
    <section className="grid grid-cols-12 max-w-5xl mx-auto gap-6 max-sm:gap-0 max-md:gap-0">
      <SideBar />
      <div className="col-span-7 max-md:col-span-11 max-sm:col-span-12  border-x">
        {children} <MobileNav />
      </div>
      <div className="col-span-3 px-1 max-md:hidden"></div>
    </section>
  );
}
