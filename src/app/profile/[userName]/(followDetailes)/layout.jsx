import { getUserData } from "@/actions/getUserData";
import ProfileBackButton from "../../componant/ProfileBackButton";
import Tabs from "../componants/tabs";

export const dynamic = "force-dynamic";

export default async function FeedLayout({ children,params }) {
  const param = await params;
  const userName = param.userName;
  const userData = await getUserData(userName);

  return (
    <section className="flex flex-col items-center h-screen  overflow-x-auto pb-12">
      <ProfileBackButton userData={userData}/>
      <Tabs />
      {children}
    </section>
  );
}
