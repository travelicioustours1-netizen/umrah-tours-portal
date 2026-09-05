import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface PromotionFilters {
  activeOnly?: boolean;
}

/* =========================================================
   GET PROMOTIONS
========================================================= */

export async function getPromotions(
  filters: PromotionFilters = {}
) {
  const { activeOnly = false } = filters;

  const where: Prisma.PromotionWhereInput = {};

  if (activeOnly) {
    const now = new Date();

    where.isActive = true;

    where.AND = [
      {
        OR: [
          {
            startDate: null,
          },
          {
            startDate: {
              lte: now,
            },
          },
        ],
      },
      {
        OR: [
          {
            endDate: null,
          },
          {
            endDate: {
              gte: now,
            },
          },
        ],
      },
    ];
  }

  return prisma.promotion.findMany({
    where,

    orderBy: [
      {
        displayOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
}

/* =========================================================
   GET PROMOTION BY ID
========================================================= */

export async function getPromotionById(id: string) {
  return prisma.promotion.findUnique({
    where: {
      id,
    },
  });
}

/* GET BY SLUG */
export async function getPromotionBySlug(slug: string) {
  return prisma.promotion.findUnique({
    where: {
      slug,
    },
  });
}

/* =========================================================
   CREATE PROMOTION
========================================================= */

export async function createPromotion(
  data: Prisma.PromotionCreateInput
) {
  return prisma.promotion.create({
    data,
  });
}

/* =========================================================
   UPDATE PROMOTION
========================================================= */

export async function updatePromotion(
  id: string,
  data: Prisma.PromotionUpdateInput
) {
  return prisma.promotion.update({
    where: {
      id,
    },
    data,
  });
}

/* =========================================================
   DELETE PROMOTION
========================================================= */

export async function deletePromotion(id: string) {
  return prisma.promotion.delete({
    where: {
      id,
    },
  });
}