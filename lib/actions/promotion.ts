"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* SLUGIFY */
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/* GENERATE UNIQUE PROMOTION SLUG */
async function generateUniquePromotionSlug(
  title: string,
  excludeId?: string
) {
  const baseSlug =
    slugify(title) || `promotion-${Date.now()}`;

  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const existing = await prisma.promotion.findUnique({
      where: { slug },
    });

    if (!existing || existing.id === excludeId) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

/* PROMOTION DATA */
function promotionData(formData: FormData) {
  const title = String(formData.get("title") || "").trim();

  const description = String(
    formData.get("description") || ""
  ).trim();

  const imageUrl = String(
    formData.get("imageUrl") || ""
  ).trim();

  const buttonText =
    String(formData.get("buttonText") || "").trim() || null;

  const whatsappUrl =
    String(formData.get("whatsappUrl") || "").trim() || null;

  const displayOrderValue = Number(
    formData.get("displayOrder") || 0
  );

  const displayOrder = Number.isFinite(displayOrderValue)
    ? displayOrderValue
    : 0;

  const startDateValue = String(
    formData.get("startDate") || ""
  ).trim();

  const endDateValue = String(
    formData.get("endDate") || ""
  ).trim();

  return {
    title,
    description,
    imageUrl,
    buttonText,
    whatsappUrl,
    isActive: formData.get("isActive") === "true",
    displayOrder,
    startDate: startDateValue
      ? new Date(startDateValue)
      : null,
    endDate: endDateValue
      ? new Date(endDateValue)
      : null,
  };
}

/* CREATE */
export async function createPromotion(formData: FormData) {
  const data = promotionData(formData);

  if (!data.title) {
    throw new Error("Promotion title is required.");
  }

  if (!data.imageUrl) {
    throw new Error("Promotion image is required.");
  }

  // Automatically generate a unique slug
  const slug = await generateUniquePromotionSlug(
    data.title
  );

  await prisma.promotion.create({
    data: {
      ...data,
      slug,
    },
  });

  revalidatePath("/dashboard/promotions");
  revalidatePath("/promotion");

  redirect("/dashboard/promotions");
}

/* UPDATE */
export async function updatePromotion(
  id: string,
  formData: FormData
) {
  const data = promotionData(formData);

  if (!data.title) {
    throw new Error("Promotion title is required.");
  }

  if (!data.imageUrl) {
    throw new Error("Promotion image is required.");
  }

  // Automatically generate a unique slug
  // while allowing the current promotion to keep its own slug
  const slug = await generateUniquePromotionSlug(
    data.title,
    id
  );

  await prisma.promotion.update({
    where: { id },
    data: {
      ...data,
      slug,
    },
  });

  revalidatePath("/dashboard/promotions");
  revalidatePath("/promotion");

  redirect("/dashboard/promotions");
}

/* DELETE */
export async function deletePromotion(id: string) {
  await prisma.promotion.delete({
    where: { id },
  });

  revalidatePath("/dashboard/promotions");
  revalidatePath("/promotion");
}