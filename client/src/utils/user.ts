import { ROLES, type RoleName } from "../common";
import type { User } from "../types/api";

export function getUserRole(user: User | null | undefined): RoleName | null {
  if (!user?.role) return null;
  if (typeof user.role === "string") return user.role as RoleName;
  return user.role.name as RoleName;
}

export function isAdmin(user: User | null | undefined) {
  return getUserRole(user) === ROLES.ADMIN;
}
