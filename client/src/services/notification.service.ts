import { api, unwrapApi } from "./api";
import type { Notification } from "../types/api";

export async function fetchNotifications() {
  return unwrapApi<Notification[]>(api.get("/notifications/"));
}
