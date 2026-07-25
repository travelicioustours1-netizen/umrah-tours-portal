export type Role =
  | "ADMIN"
  | "STAFF"
  | "USER";


export type Permission =
  | "*"
  | "BOOKING_VIEW"
  | "BOOKING_CREATE"
  | "BOOKING_UPDATE"
  | "BOOKING_DELETE"
  | "PACKAGE_VIEW"
  | "PACKAGE_CREATE"
  | "PACKAGE_UPDATE"
  | "PACKAGE_DELETE"
  | "HOTEL_VIEW"
  | "HOTEL_CREATE"
  | "HOTEL_UPDATE"
  | "HOTEL_DELETE";


const permissions: Record<Role, Permission[]> = {

  ADMIN: [
    "*",
  ],

  STAFF: [
    "BOOKING_VIEW",
    "BOOKING_CREATE",
    "PACKAGE_VIEW",
    "HOTEL_VIEW",
  ],

  USER: [],
};


export function hasPermission(
  role: Role,
  permission: Permission
) {

  const allowed = permissions[role];

  return (
    allowed.includes("*") ||
    allowed.includes(permission)
  );
}