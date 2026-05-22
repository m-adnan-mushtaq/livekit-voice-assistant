import { api, unwrapApi } from "./api";
import type { StaffMember } from "../types/api";

export async function fetchPublicStaff() {
  return unwrapApi<StaffMember[]>(api.get("/staff"));
}
