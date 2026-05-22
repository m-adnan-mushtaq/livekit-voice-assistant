import { api, unwrapApi } from "./api";
import type { ShiftSettings, ShiftSettingsPayload } from "../types/api";

export async function fetchShiftSettings() {
  return unwrapApi<ShiftSettings | null>(api.get("/shift-settings/"));
}

export async function saveShiftSettings(payload: ShiftSettingsPayload) {
  return unwrapApi<ShiftSettings>(api.post("/shift-settings/", payload));
}
