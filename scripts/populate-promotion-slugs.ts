import { prisma } from "../lib/prisma";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const promotions = await prisma.promotion.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const usedSlugs = new Set<string>();

  for (const promotion of promotions) {
    const baseSlug =
      slugify(promotion.title) || `promotion-${promotion.id}`;

    let slug = baseSlug;
    let counter = 2;

    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    usedSlugs.add(slug);

    await prisma.promotion.update({
      where: {
        id: promotion.id,
      },
      data: {
        slug,
      },
    });

    console.log(`✓ ${promotion.title} → ${slug}`);
  }

  console.log(`\nUpdated ${promotions.length} promotion(s).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });