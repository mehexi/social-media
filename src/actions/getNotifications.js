import prisma from "@/lib/prismaDb";
import { getUserData } from "./getUserData";

export const getNotifications = async () => {
  try {
    const currentUser = await getUserData();

    const notifications = await prisma.notification.findMany({
      where: {
        userId: currentUser.id
      },
      include: {
        actor: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    await prisma.notification.updateMany({
      where: {
        userId: currentUser.id,
        read: false
      },
      data: {
        read: true
      }
    })

    return notifications;
  } catch (error) {
    console.error(error);
    return null;
  }
};
