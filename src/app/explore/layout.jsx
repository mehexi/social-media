import SideBar from "@/components/sideBar/SideBar";

export default function ExploreLayout({ children }) {
  return (
    <section className="grid grid-cols-12">
      <SideBar />
      <div className="col-span-8 border">{children}</div>
      <div className="border col-span-2"></div>
    </section>
  );
}
