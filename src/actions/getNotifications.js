import prisma from "@/lib/prismaDb";
import { getUserData } from "./getUserData";

export const getNotifications = async () => {
  try {
    const currentUser = await getUserData();

    const notifications = await prisma.notification.findMany({
      where: {
        userId: currentUser.id
      }
    });

    return notifications;
  } catch (error) {
    console.error(error);
    return null;
  }
};
