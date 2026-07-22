"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function packageData(formData: FormData) {
  const title = String(formData.get("title") || "").trim();

  return {
    title,

    slug:
      String(formData.get("slug") || "").trim() ||
      title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),

    packageCode:
      String(formData.get("packageCode") || "") || null,

    status:
      String(formData.get("status") || "ACTIVE"),

    description:
      String(formData.get("description") || ""),

    duration:
      String(formData.get("duration") || ""),

    category:
      String(formData.get("category") || "") || null,

    departureCity:
      String(formData.get("departureCity") || "") || null,

    departureDate: formData.get("departureDate")
      ? new Date(String(formData.get("departureDate")))
      : null,

    returnDate: formData.get("returnDate")
      ? new Date(String(formData.get("returnDate")))
      : null,

    flightNumber:
      String(formData.get("flightNumber") || "") || null,

    airlineId:
      String(formData.get("airlineId") || "") || null,

    makkahHotelId:
      String(formData.get("makkahHotelId") || "") || null,

    madinahHotelId:
      String(formData.get("madinahHotelId") || "") || null,

    makkahNights: parseInt(
      String(formData.get("makkahNights") || "0"),
      10
    ),

    madinahNights: parseInt(
      String(formData.get("madinahNights") || "0"),
      10
    ),

    price: parseFloat(
      String(formData.get("price") || "0")
    ),

    quadPrice: parseFloat(
      String(formData.get("quadPrice") || "0")
    ),

    triplePrice: parseFloat(
      String(formData.get("triplePrice") || "0")
    ),

    doublePrice: parseFloat(
      String(formData.get("doublePrice") || "0")
    ),

    singlePrice: parseFloat(
      String(formData.get("singlePrice") || "0")
    ),

    childBedPrice: parseFloat(
      String(formData.get("childBedPrice") || "0")
    ),

    childNoBedPrice: parseFloat(
      String(formData.get("childNoBedPrice") || "0")
    ),

    infantPrice: parseFloat(
      String(formData.get("infantPrice") || "0")
    ),

    featured:
      formData.get("featured") === "true",

    visa:
      formData.get("visa") !== "false",

    transport:
      formData.get("transport") !== "false",

    meals:
      formData.get("meals") !== "false",

    itinerary:
      String(formData.get("itinerary") || "") || null,

    inclusions:
      String(formData.get("inclusions") || "") || null,

    exclusions:
      String(formData.get("exclusions") || "") || null,

    brochure:
      String(formData.get("brochure") || "") || null,
  };
}

export async function createPackage(formData: FormData) {
  const created = await prisma.package.create({
    data: packageData(formData),
  });

  const images = JSON.parse(
    String(formData.get("images") || "[]")
  );

  if (images.length > 0) {
    await prisma.packageImage.createMany({
      data: images.map(
        (url: string, index: number) => ({
          url,
          sortOrder: index,
          packageId: created.id,
        })
      ),
    });
  }

  revalidatePath("/dashboard/packages");
  redirect("/dashboard/packages");
}

export async function updatePackage(
  id: string,
  formData: FormData
) {
  await prisma.package.update({
    where: { id },
    data: packageData(formData),
  });

  const images = JSON.parse(
    String(formData.get("images") || "[]")
  );

  await prisma.packageImage.deleteMany({
    where: {
      packageId: id,
    },
  });

  if (images.length > 0) {
    await prisma.packageImage.createMany({
      data: images.map(
        (url: string, index: number) => ({
          url,
          sortOrder: index,
          packageId: id,
        })
      ),
    });
  }

  revalidatePath("/dashboard/packages");
  redirect("/dashboard/packages");
}

export async function deletePackage(id: string) {
  await prisma.package.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/packages");
}