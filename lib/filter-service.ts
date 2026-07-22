import { prisma } from "@/lib/prisma";

export async function getPackageFilters() {
  const [airlines, makkahHotels, cities, categories] =
    await Promise.all([
      prisma.airline.findMany({
        where: {
          packages: {
            some: {
              status: "ACTIVE",
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      }),

      prisma.hotel.findMany({
        where: {
          makkahPackages: {
            some: {
              status: "ACTIVE",
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      }),

      prisma.package.findMany({
        distinct: ["departureCity"],
        where: {
          status: "ACTIVE",
          departureCity: {
            not: null,
          },
        },
        select: {
          departureCity: true,
        },
        orderBy: {
          departureCity: "asc",
        },
      }),

      prisma.package.findMany({
        distinct: ["category"],
        where: {
          status: "ACTIVE",
          category: {
            not: null,
          },
        },
        select: {
          category: true,
        },
        orderBy: {
          category: "asc",
        },
      }),
    ]);

  return {
    airlines,
    makkahHotels,
    cities: cities
      .map((c) => c.departureCity)
      .filter(Boolean),

    categories: categories
      .map((c) => c.category)
      .filter(Boolean),
  };
}