export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export const LIVEKIT_URL =
  import.meta.env.VITE_LIVEKIT_URL ?? "wss://yoga-ai-xdh0fx66.livekit.cloud";

export const LIVEKIT_AGENT_NAME =
  import.meta.env.VITE_LIVEKIT_AGENT_NAME ?? "Alexa";

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "yoga_access_token",
} as const;

export const CACHE_KEYS = {
  ME: "me",
  USERS: "users",
  BOOKINGS: "bookings",
  NOTIFICATIONS: "notifications",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  BOOKINGS: "/dashboard/bookings",
  USERS: "/dashboard/users",
  ALEXA: "/alexa",
} as const;

export const ROLES = {
  ADMIN: "admin",
  STAFF: "staff",
  CLIENT: "client",
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];
