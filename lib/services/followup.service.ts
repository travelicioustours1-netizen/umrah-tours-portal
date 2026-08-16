import { prisma } from "@/lib/prisma";

export async function getFollowUpEnquiries() {
  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

  const enquiries = await prisma.enquiry.findMany({
    where: {
      nextFollowUpAt: {
        not: null,
      },
      status: {
        notIn: ["WON", "LOST"],
      },
    },
    include: {
      package: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      nextFollowUpAt: "asc",
    },
  });

  const overdue = enquiries.filter((enquiry) => {
    if (!enquiry.nextFollowUpAt) {
      return false;
    }

    return enquiry.nextFollowUpAt < startOfToday;
  });

  const dueToday = enquiries.filter((enquiry) => {
    if (!enquiry.nextFollowUpAt) {
      return false;
    }

    return (
      enquiry.nextFollowUpAt >= startOfToday &&
      enquiry.nextFollowUpAt <= endOfToday
    );
  });

  const upcoming = enquiries.filter((enquiry) => {
    if (!enquiry.nextFollowUpAt) {
      return false;
    }

    return enquiry.nextFollowUpAt > endOfToday;
  });

  return {
    overdue,
    dueToday,
    upcoming,
  };
}
