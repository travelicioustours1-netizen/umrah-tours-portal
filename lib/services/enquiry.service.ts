import { prisma } from "@/lib/prisma";

export async function getAllEnquiries() {
  return prisma.enquiry.findMany({
    include: {
      package: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getEnquiryById(id: string) {
  return prisma.enquiry.findUnique({
    where: {
      id,
    },
    include: {
      package: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });
}