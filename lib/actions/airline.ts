"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAirline(formData: FormData) {
  await prisma.airline.create({
    data: {
      name: String(formData.get("name")),
      code: String(formData.get("code") || ""),
      logo: String(formData.get("logo") || ""),
    },
  });

  revalidatePath("/dashboard/airlines");
  redirect("/dashboard/airlines");
}

export async function updateAirline(
  id: string,
  formData: FormData
) {
  await prisma.airline.update({
    where: { id },
    data: {
      name: String(formData.get("name")),
      code: String(formData.get("code") || ""),
      logo: String(formData.get("logo") || ""),
    },
  });

  revalidatePath("/dashboard/airlines");
  redirect("/dashboard/airlines");
}

export async function deleteAirline(id: string) {
  await prisma.airline.delete({
    where: { id },
  });

  revalidatePath("/dashboard/airlines");
}