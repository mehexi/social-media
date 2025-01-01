import prisma from "@/lib/prismaDb";
import { getUserData } from "./getUserData";

export const getReports = async () => {
  try {
    const currentUser = await getUserData();
    const reports = await prisma.report.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return reports;
  } catch {
    return null;
  }
};
