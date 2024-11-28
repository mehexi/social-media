import SideBar from "@/components/sideBar/SideBar";

export const metadata = {
  title: "Home / Y",
  description: "Generated by create next app",
};

export default function FeedLayout({ children }) {
  return (
    <section className="grid grid-cols-12 max-w-5xl mx-auto">
      <SideBar />
      <div className="col-span-8 max-md:col-span-11 max-sm:col-span-12">{children}</div>
      <div className="col-span-2"></div>
    </section>
  );
}