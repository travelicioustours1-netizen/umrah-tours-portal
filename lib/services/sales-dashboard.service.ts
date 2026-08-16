import { prisma } from "@/lib/prisma";

export async function getSalesDashboardData() {
  const enquiries = await prisma.enquiry.findMany({
    include: {
      package: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = enquiries.length;

  const newCount = enquiries.filter(
    (e) => e.status === "NEW"
  ).length;

  const contactedCount = enquiries.filter(
    (e) => e.status === "CONTACTED"
  ).length;

  const qualifiedCount = enquiries.filter(
    (e) => e.status === "QUALIFIED"
  ).length;

  const quoteSentCount = enquiries.filter(
    (e) => e.status === "QUOTE_SENT"
  ).length;

  const followUpCount = enquiries.filter(
    (e) => e.status === "FOLLOW_UP"
  ).length;

  const wonCount = enquiries.filter(
    (e) => e.status === "WON"
  ).length;

  const lostCount = enquiries.filter(
    (e) => e.status === "LOST"
  ).length;

  const pipelineValue = enquiries
    .filter((e) =>
      ["QUALIFIED", "QUOTE_SENT", "FOLLOW_UP"].includes(
        e.status
      )
    )
    .reduce(
      (total, e) => total + (e.estimatedValue ?? 0),
      0
    );

  const wonValue = enquiries
    .filter((e) => e.status === "WON")
    .reduce(
      (total, e) => total + (e.estimatedValue ?? 0),
      0
    );

  const now = new Date();

  const overdueFollowUps = enquiries.filter((e) => {
    if (!e.nextFollowUpAt) return false;

    return (
      e.nextFollowUpAt < now &&
      e.status !== "WON" &&
      e.status !== "LOST"
    );
  });

  const upcomingFollowUps = enquiries.filter((e) => {
    if (!e.nextFollowUpAt) return false;

    return (
      e.nextFollowUpAt >= now &&
      e.status !== "WON" &&
      e.status !== "LOST"
    );
  });

  return {
    enquiries,
    metrics: {
      total,
      newCount,
      contactedCount,
      qualifiedCount,
      quoteSentCount,
      followUpCount,
      wonCount,
      lostCount,
      pipelineValue,
      wonValue,
      overdueCount: overdueFollowUps.length,
      upcomingCount: upcomingFollowUps.length,
    },
    overdueFollowUps,
    upcomingFollowUps,
  };
}
