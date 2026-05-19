const DEFAULT_TOKEN_ENDPOINT = "http://localhost:8000/voice-ai/token";
const DEFAULT_ROOM_NAME = "yoga";
const DEFAULT_AGENT_NAME = "Alexa";

export const LIVEKIT_URL =
  import.meta.env.VITE_LIVEKIT_URL ?? "wss://yoga-ai-xdh0fx66.livekit.cloud";

export const LIVEKIT_TOKEN_ENDPOINT =
  import.meta.env.VITE_LIVEKIT_TOKEN_ENDPOINT ?? DEFAULT_TOKEN_ENDPOINT;

export const LIVEKIT_ROOM_NAME =
  import.meta.env.VITE_LIVEKIT_ROOM_NAME ?? DEFAULT_ROOM_NAME;

export const LIVEKIT_AGENT_NAME =
  import.meta.env.VITE_LIVEKIT_AGENT_NAME ?? DEFAULT_AGENT_NAME;

type LiveKitTokenResponse = {
  token?: unknown;
};

type FetchLiveKitTokenOptions = {
  signal?: AbortSignal;
};

export async function fetchLiveKitToken(
  name: string,
  options: FetchLiveKitTokenOptions = {},
) {
  const participant = name.trim() || "Guest";

  const res = await fetch(LIVEKIT_TOKEN_ENDPOINT, {
    method: "POST",
    signal: options.signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      room_name: LIVEKIT_ROOM_NAME,
      participant,
      agent_name: LIVEKIT_AGENT_NAME,
    }),
  });

  if (!res.ok) {
    const details = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch LiveKit token (${res.status})${details ? `: ${details}` : ""}`,
    );
  }

  const data = (await res.json()) as LiveKitTokenResponse;

  if (typeof data.token !== "string" || data.token.length === 0) {
    throw new Error("Token endpoint did not return a valid LiveKit token");
  }

  return data.token;
}
