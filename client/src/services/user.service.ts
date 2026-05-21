import { api, unwrapApi } from "./api";
import type { PaginatedUsers, User } from "../types/api";
import type { RoleName } from "../common";
import type { StaffFormValues } from "../schema/auth.schema";

type UsersQuery = {
  page?: number;
  limit?: number;
  role?: RoleName;
  search?: string;
};

export async function fetchMe() {
  return unwrapApi<User>(api.get("/users/me"));
}

export async function fetchUsers(params: UsersQuery = {}) {
  return unwrapApi<PaginatedUsers>(api.get("/users/", { params }));
}

export async function updateUser(
  userId: string,
  payload: { is_active?: boolean },
) {
  return unwrapApi<User>(api.patch(`/users/${userId}`, payload));
}

export async function createStaff(payload: StaffFormValues) {
  return unwrapApi<User>(api.post("/users/staff", payload));
}
