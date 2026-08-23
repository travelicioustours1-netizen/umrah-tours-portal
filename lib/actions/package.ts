"use server";

import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function numberOrNull(value: FormDataEntryValue | null) {
  if (value === null || String(value).trim() === "") {
    return null;
  }

  const number = parseFloat(String(value));

  return Number.isFinite(number) ? number : null;
}

function numberOrZero(value: FormDataEntryValue | null) {
  if (value === null || String(value).trim() === "") {
    return 0;
  }

  const number = parseFloat(String(value));

  return Number.isFinite(number) ? number : 0;
}

function packageData(formData: FormData) {
  const title = String(
    formData.get("title") || ""
  ).trim();

  const slug =
    String(formData.get("slug") || "").trim() ||
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const category =
    String(formData.get("category") || "").trim() ||
    null;

  const selectedRegion =
    String(formData.get("region") || "").trim();

  const region =
    category === "HOLIDAY" && selectedRegion
      ? selectedRegion
      : null;

  const selectedDestination =
    String(formData.get("destination") || "").trim();

  const destination =
    category === "HOLIDAY" && selectedDestination
      ? selectedDestination
      : null;

  return {
    title,

    slug,

    packageCode:
      String(
        formData.get("packageCode") || ""
      ).trim() || null,

    status:
      String(
        formData.get("status") || "ACTIVE"
      ),

    description:
      String(
        formData.get("description") || ""
      ),

    duration:
      String(
        formData.get("duration") || ""
      ),

    category,

    region,

    destination,

    /*
     * SEO
     */
    seoTitle:
      String(
        formData.get("seoTitle") || ""
      ).trim() || null,

    seoDescription:
      String(
        formData.get("seoDescription") || ""
      ).trim() || null,

    seoKeywords:
      String(
        formData.get("seoKeywords") || ""
      ).trim() || null,

    departureCity:
      String(
        formData.get("departureCity") || ""
      ).trim() || null,

    departureDate:
      formData.get("departureDate")
        ? new Date(
            String(
              formData.get("departureDate")
            )
          )
        : null,

    returnDate:
      formData.get("returnDate")
        ? new Date(
            String(
              formData.get("returnDate")
            )
          )
        : null,

    flightNumber:
      String(
        formData.get("flightNumber") || ""
      ).trim() || null,

    airlineId:
      String(
        formData.get("airlineId") || ""
      ).trim() || null,

    /*
     * Existing Umrah hotel relations
     */
    makkahHotelId:
      String(
        formData.get("makkahHotelId") || ""
      ).trim() || null,

    madinahHotelId:
      String(
        formData.get("madinahHotelId") || ""
      ).trim() || null,

    makkahNights: parseInt(
      String(
        formData.get("makkahNights") || "0"
      ),
      10
    ),

    madinahNights: parseInt(
      String(
        formData.get("madinahNights") || "0"
      ),
      10
    ),

    /*
     * Main advertised price
     */
    price: numberOrZero(
      formData.get("price")
    ),

    /*
     * Umrah room pricing
     */
    quadPrice: numberOrNull(
      formData.get("quadPrice")
    ),

    triplePrice: numberOrNull(
      formData.get("triplePrice")
    ),

    doublePrice: numberOrNull(
      formData.get("doublePrice")
    ),

    singlePrice: numberOrNull(
      formData.get("singlePrice")
    ),

    childBedPrice: numberOrNull(
      formData.get("childBedPrice")
    ),

    childNoBedPrice: numberOrNull(
      formData.get("childNoBedPrice")
    ),

    infantPrice: numberOrNull(
      formData.get("infantPrice")
    ),

    /*
     * Holiday hotel-category pricing
     */
    hotel3Price: numberOrNull(
      formData.get("hotel3Price")
    ),

    hotel4Price: numberOrNull(
      formData.get("hotel4Price")
    ),

    hotel5Price: numberOrNull(
      formData.get("hotel5Price")
    ),

    /*
     * Package options
     */
    featured:
      formData.get("featured") === "true",

    visa:
      formData.get("visa") !== "false",

    transport:
      formData.get("transport") !== "false",

    meals:
      formData.get("meals") !== "false",

    /*
     * Content
     */
    itinerary:
      String(
        formData.get("itinerary") || ""
      ).trim() || null,

    inclusions:
      String(
        formData.get("inclusions") || ""
      ).trim() || null,

    exclusions:
      String(
        formData.get("exclusions") || ""
      ).trim() || null,

    brochure:
      String(
        formData.get("brochure") || ""
      ).trim() || null,
  };
}

/* =========================================================
   CREATE PACKAGE
========================================================= */

export async function createPackage(
  formData: FormData
) {
  const data = packageData(formData);

  const created = await prisma.package.create({
    data,
  });

  const rawImages = String(
    formData.get("images") || "[]"
  );

  let images: string[] = [];

  try {
    images = JSON.parse(rawImages);

    if (!Array.isArray(images)) {
      images = [];
    }
  } catch {
    images = [];
  }

  if (images.length > 0) {
    await prisma.packageImage.createMany({
      data: images.map(
        (
          url: string,
          index: number
        ) => ({
          url,
          sortOrder: index,
          packageId: created.id,
        })
      ),
    });
  }

  revalidatePath(
    "/dashboard/packages"
  );

  revalidatePath("/umrah");

  revalidatePath("/holidays");

  revalidatePath("/visa");

  redirect(
    "/dashboard/packages"
  );
}

/* =========================================================
   UPDATE PACKAGE
========================================================= */

export async function updatePackage(
  id: string,
  formData: FormData
) {
  const data = packageData(formData);

  /*
   * Update package and retrieve slug/category
   * for individual-page revalidation.
   */
  const updatedPackage =
    await prisma.package.update({
      where: {
        id,
      },

      data,

      select: {
        slug: true,
        category: true,
      },
    });

  /*
   * Process package images
   */
  const rawImages = String(
    formData.get("images") || "[]"
  );

  let images: string[] = [];

  try {
    images = JSON.parse(rawImages);

    if (!Array.isArray(images)) {
      images = [];
    }
  } catch {
    images = [];
  }

  /*
   * Replace existing package images
   */
  await prisma.packageImage.deleteMany({
    where: {
      packageId: id,
    },
  });

  /*
   * Add new package images
   */
  if (images.length > 0) {
    await prisma.packageImage.createMany({
      data: images.map(
        (
          url: string,
          index: number
        ) => ({
          url,
          sortOrder: index,
          packageId: id,
        })
      ),
    });
  }

  /*
   * Revalidate dashboard and listing pages
   */
  revalidatePath(
    "/dashboard/packages"
  );

  revalidatePath("/umrah");

  revalidatePath("/holidays");

  revalidatePath("/visa");

  /*
   * Revalidate individual package page
   *
   * This is especially important for SEO metadata.
   */
  if (
    updatedPackage.category ===
    "HOLIDAY"
  ) {
    revalidatePath(
      `/holidays/${updatedPackage.slug}`
    );
  }

  if (
    updatedPackage.category ===
    "VISA"
  ) {
    revalidatePath(
      `/visa/${updatedPackage.slug}`
    );
  }

  if (
    updatedPackage.category !==
      "HOLIDAY" &&
    updatedPackage.category !==
      "VISA"
  ) {
    revalidatePath(
      `/umrah/${updatedPackage.slug}`
    );
  }

  redirect(
    "/dashboard/packages"
  );
}

/* =========================================================
   DELETE PACKAGE
========================================================= */

export async function deletePackage(
  id: string
) {
  await prisma.package.delete({
    where: {
      id,
    },
  });

  revalidatePath(
    "/dashboard/packages"
  );

  revalidatePath("/umrah");

  revalidatePath("/holidays");

  revalidatePath("/visa");
}

/* =========================================================
   DELETE PACKAGE IMAGE
========================================================= */

export async function deletePackageImage(
  imageId: string
) {
  const image =
    await prisma.packageImage.findUnique({
      where: {
        id: imageId,
      },
    });

  if (!image) {
    throw new Error(
      "Package image not found."
    );
  }

  /*
   * Delete database record
   */
  await prisma.packageImage.delete({
    where: {
      id: imageId,
    },
  });

  /*
   * Delete actual file from
   * Supabase Storage
   */
  try {
    const marker =
      "/storage/v1/object/public/package-images/";

    const index =
      image.url.indexOf(marker);

    if (index !== -1) {
      const filePath =
        image.url.substring(
          index + marker.length
        );

      const { error } =
        await supabaseAdmin.storage
          .from("package-images")
          .remove([filePath]);

      if (error) {
        console.error(
          "SUPABASE IMAGE DELETE ERROR:",
          error
        );
      }
    }
  } catch (error) {
    console.error(
      "PACKAGE IMAGE STORAGE DELETE ERROR:",
      error
    );
  }

  /*
   * Revalidate image listings
   */
  revalidatePath(
    "/dashboard/packages"
  );

  revalidatePath("/umrah");

  revalidatePath("/holidays");

  revalidatePath("/visa");
}