import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@umrahtours.co";
  const password = "Admin@123";

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: "Administrator",
      email,
      password: hashedPassword,
      role: "ADMIN",
      updatedAt: new Date(),
    },
  });

  console.log("Admin created successfully!");
  console.log("----------------------------");
  console.log("Email:", email);
  console.log("Password:", password);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
