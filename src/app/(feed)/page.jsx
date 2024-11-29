import MediaBody from "./componants/MediaBody";

export default async  function Home() {
  return (
    <section className="flex flex-col items-center h-screen overflow-x-auto p-0">
      <MediaBody />
    </section>
  );
}
