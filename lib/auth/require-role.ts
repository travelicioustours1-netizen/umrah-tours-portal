import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasPermission, type Permission, type Role } from "./permissions";


export async function requireRole(
  permission: Permission
) {

  const session = await auth();


  if (!session?.user) {
    redirect("/login");
  }


  const role = session.user.role as Role;


  if (!hasPermission(role, permission)) {
    redirect("/403");
  }


  return session;
}