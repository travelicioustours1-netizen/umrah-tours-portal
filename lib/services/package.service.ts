import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const packageInclude = Prisma.validator<Prisma.PackageInclude>()({
  images: {
    orderBy: {
      sortOrder: "asc",
    },
  },

  airline: true,

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
});
export type PackageWithRelations =
  Prisma.PackageGetPayload<{
    include: typeof packageInclude;
  }>;

const PAGE_SIZE = 9;

export interface GetPackagesOptions {
  search?: string;
  category?: string;
  departureCity?: string;
  airlineId?: string;
  featured?: boolean;
  sort?: "departure" | "price-low" | "price-high" | "newest";
  page?: number;
}

export async function getPackages(
  options: GetPackagesOptions = {}
) {
  const page = options.page ?? 1;

 const where: Prisma.PackageWhereInput = {
  status: "ACTIVE",

  ...(options.search && {
    OR: [
      {
        title: {
          contains: options.search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: options.search,
          mode: "insensitive",
        },
      },
    ],
  }),

  ...(options.category && {
    category: options.category,
  }),

  ...(options.departureCity && {
    departureCity: options.departureCity,
  }),

  ...(options.airlineId && {
    airlineId: options.airlineId,
  }),

  ...(options.featured !== undefined && {
    featured: options.featured,
  }),
};

  let orderBy: Prisma.PackageOrderByWithRelationInput = {
    createdAt: "desc",
  };

  switch (options.sort) {
    case "departure":
      orderBy = {
        departureDate: "asc",
      };
      break;

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
    default:
      orderBy = {
        createdAt: "desc",
      };
  }

  const [packages, total] = await Promise.all([
    prisma.package.findMany({
      where,
      include: packageInclude,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),

    prisma.package.count({
      where,
    }),
  ]);

  return {
    packages,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export async function getPackageById(id: string) {
  return prisma.package.findUnique({
    where: {
      id,
    },
    include: packageInclude,
  });
}

export async function getPackageBySlug(slug: string) {
  return prisma.package.findUnique({
    where: {
      slug,
    },
    include: packageInclude,
  });
}

export async function getRelatedPackages(
  category: string,
  currentId: string
) {
  return prisma.package.findMany({
    where: {
      status: "ACTIVE",
      category,
      id: {
        not: currentId,
      },
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

    take: 3,
  });
}

    
export async function createPackage(
  data: Prisma.PackageCreateInput
) {
  return prisma.package.create({
    data,
    include: packageInclude,
  });
}

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

export async function deletePackage(id: string) {
  return prisma.package.delete({
    where: {
      id,
    },
  });
}
export async function getFeaturedPackages() {
  return prisma.package.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      images: true,
      airline: true,
      makkahHotel: true,
      madinahHotel: true,
    },
    take: 6,
  });
}