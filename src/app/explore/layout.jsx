import MobileNav from "@/components/sideBar/MobileNav";
import SideBar from "@/components/sideBar/SideBar";

export default function ExploreLayout({ children }) {
  return (
    <section className="grid grid-cols-12 max-w-5xl mx-auto">
      <SideBar />
      <div className="col-span-8 max-md:col-span-11 max-sm:col-span-12  border-r">
        {children} <MobileNav/>
      </div>
      <div className="col-span-2"></div>
    </section>
  );
}
