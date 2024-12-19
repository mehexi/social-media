import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NotificationBody from "./components/NotificationBody";
import { getNotifications } from "@/actions/getNotifications";
import { getUserData } from "@/actions/getUserData";

const page = async () => {
  const notifications = await getNotifications();
  const currentUser = await getUserData()

  console.log(notifications,currentUser)

  return (
    <section className="flex flex-col h-screen overflow-x-auto">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <NotificationBody currentUser={currentUser} notifications={notifications} />
      </CardContent>
    </section>
  );
};

export default page;
