"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createHotel(formData: FormData) {
  await prisma.hotel.create({
    data: {
      name: String(formData.get("name")),
      city: String(formData.get("city")),
      stars: Number(formData.get("stars")),
      distance: String(formData.get("distance") || ""),
      address: String(formData.get("address") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      website: String(formData.get("website") || ""),
      thumbnail: String(formData.get("thumbnail") || ""),
      active: formData.get("active") === "on",
    },
  });

  revalidatePath("/dashboard/hotels");
  redirect("/dashboard/hotels");
}

export async function updateHotel(
  id: string,
  formData: FormData
) {
  await prisma.hotel.update({
    where: { id },
    data: {
      name: String(formData.get("name")),
      city: String(formData.get("city")),
      stars: Number(formData.get("stars")),
      distance: String(formData.get("distance") || ""),
      address: String(formData.get("address") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      website: String(formData.get("website") || ""),
      thumbnail: String(formData.get("thumbnail") || ""),
      active: formData.get("active") === "on",
    },
  });

  revalidatePath("/dashboard/hotels");
  redirect("/dashboard/hotels");
}

export async function deleteHotel(id: string) {
  await prisma.hotel.delete({
    where: { id },
  });

  revalidatePath("/dashboard/hotels");
}