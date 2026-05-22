import { api, unwrapApi } from "./api";
import { LIVEKIT_AGENT_NAME } from "../common";
import type { LiveKitTokenData } from "../types/api";

export function buildRoomName(userId: string) {
  return `yoga-${userId}-${Date.now()}`;
}

export async function fetchLiveKitToken(userId: string) {
  const room_name = buildRoomName(userId);
  return unwrapApi<LiveKitTokenData>(
    api.post("/livekitai/token", {
      room_name,
      agent_name: LIVEKIT_AGENT_NAME,
      time_zone:
        Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Karachi",
    }),
  );
}
