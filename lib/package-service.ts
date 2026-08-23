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

  /* SEARCH */
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

  /* CATEGORY */
  if (category) {
    if (category === "UMRAH_ALL") {
      where.category = {
        in: ["UMRAH", "economy"],
      };
    } else {
      where.category = {
        equals: category,
        mode: "insensitive",
      };
    }
  }

  /* DEPARTURE CITY */
  if (departureCity) {
    where.departureCity = {
      equals: departureCity,
      mode: "insensitive",
    };
  }

  /* AIRLINE */
  if (airlineId) {
    where.airlineId = airlineId;
  }

  /* FEATURED */
  if (featured !== undefined) {
    where.featured = featured;
  }

  /* SORT */
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

    case "departure":
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
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

/* =========================================================
   FEATURED PACKAGES
========================================================= */

export async function getFeaturedPackages(
  category?: string
) {
  const where: Prisma.PackageWhereInput = {
    status: "ACTIVE",
    featured: true,
  };

  if (category) {
    if (category === "UMRAH_ALL") {
      where.category = {
        in: ["UMRAH", "economy"],
      };
    } else {
      where.category = {
        equals: category,
        mode: "insensitive",
      };
    }
  }

  return prisma.package.findMany({
    where,
    include: packageInclude,
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });
}

/* =========================================================
   PACKAGE BY ID
========================================================= */

export async function getPackageById(id: string) {
  return prisma.package.findUnique({
    where: {
      id,
    },
    include: packageInclude,
  });
}

/* =========================================================
   PACKAGE BY SLUG
========================================================= */

export async function getPackageBySlug(slug: string) {
  return prisma.package.findUnique({
    where: {
      slug,
    },
    include: packageInclude,
  });
}

/* =========================================================
   RELATED PACKAGES
========================================================= */

export async function getRelatedPackages(
  category: string,
  currentPackageId: string
) {
  return prisma.package.findMany({
    where: {
      status: "ACTIVE",

      category: {
        equals: category,
        mode: "insensitive",
      },

      NOT: {
        id: currentPackageId,
      },
    },

    include: packageInclude,

    take: 3,

    orderBy: {
      createdAt: "desc",
    },
  });
}

/* =========================================================
   CREATE PACKAGE
========================================================= */

export async function createPackage(
  data: Prisma.PackageCreateInput
) {
  return prisma.package.create({
    data,
    include: packageInclude,
  });
}

/* =========================================================
   UPDATE PACKAGE
========================================================= */

export async function updatePackage(
  id: string,
  data: Prisma.PackageUpdateInput
) {
  return prisma.package.update({
    where: {
      id,
    },
    data,
    include: packageInclude,
  });
}

/* =========================================================
   DELETE PACKAGE
========================================================= */

export async function deletePackage(id: string) {
  return prisma.package.delete({
    where: {
      id,
    },
  });
}