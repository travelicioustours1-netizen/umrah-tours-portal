import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface PackageFilters {
  search?: string;
  category?: string;
  departureCity?: string;
  airlineId?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
  sort?: "departure" | "price-low" | "price-high" | "newest";
}

const packageInclude = {
  images: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  airline: true,
  makkahHotel: true,
  madinahHotel: true,
} satisfies Prisma.PackageInclude;

export async function getPackages(
  filters: PackageFilters = {}
) {
  const {
    search,
    category,
    departureCity,
    airlineId,
    featured,
    page = 1,
    limit = 9,
    sort = "departure",
  } = filters;

  const where: Prisma.PackageWhereInput = {
    status: "ACTIVE",
  };

  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (category) {
  where.category = {
    equals: category,
    mode: "insensitive",
  };
}

  if (departureCity) {
    where.departureCity = departureCity;
  }

  if (airlineId) {
    where.airlineId = airlineId;
  }

  if (featured !== undefined) {
    where.featured = featured;
  }

  let orderBy: Prisma.PackageOrderByWithRelationInput;

  switch (sort) {
    case "price-low":
      orderBy = {
        price: "asc",
      };
      break;

    case "price-high":
      orderBy = {
        price: "desc",
      };
      break;

    case "newest":
      orderBy = {
        createdAt: "desc",
      };
      break;

    default:
      orderBy = {
        departureDate: "asc",
      };
      break;
  }

  const [packages, total] = await Promise.all([
    prisma.package.findMany({
      where,
      include: packageInclude,
      skip: (page - 1) * limit,
      take: limit,
      orderBy,
    }),

    prisma.package.count({
      where,
    }),
  ]);

  return {
    packages,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getFeaturedPackages(category?: string) {
  return prisma.package.findMany({
    where: {
      featured: true,
      status: "ACTIVE",
      ...(category
        ? {
            category: {
              equals: category,
              mode: "insensitive",
            },
          }
        : {}),
    },
    include: packageInclude,
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPackageBySlug(slug: string) {
  return prisma.package.findUnique({
    where: {
      slug,
    },
    include: {
      airline: true,

      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },

      makkahHotel: {
        include: {
          images: true,
        },
      },

      madinahHotel: {
        include: {
          images: true,
        },
      },
    },
  });
}

export async function getRelatedPackages(
  category: string,
  currentPackageId: string
) {
  return prisma.package.findMany({
    where: {
      status: "ACTIVE",
      category,
      NOT: {
        id: currentPackageId,
      },
    },

    include: {
      images: {
        take: 1,
        orderBy: {
          sortOrder: "asc",
        },
      },

      airline: true,

      makkahHotel: true,
    },

    take: 3,

    orderBy: {
      createdAt: "desc",
    },
  });
}