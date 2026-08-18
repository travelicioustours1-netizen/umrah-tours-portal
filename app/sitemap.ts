import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const baseUrl = "https://umrahtours.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const packages = await prisma.package.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      slug: true,
      category: true,
      updatedAt: true,
    },
  });

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/umrah`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/holidays`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/visa`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const packagePages: MetadataRoute.Sitemap = packages
    .filter((pkg) => pkg.category)
    .map((pkg) => {
      const isHoliday =
        pkg.category?.toUpperCase() === "HOLIDAY";

      return {
        url: `${baseUrl}/${isHoliday ? "holidays" : "umrah"}/${pkg.slug}`,
        lastModified: pkg.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });

  return [...staticPages, ...packagePages];
}