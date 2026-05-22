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
  STAFF_PUBLIC: "staff_public",
  SHIFT_SETTINGS: "shift_settings",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  BOOKINGS: "/dashboard/bookings",
  bookingDetail: (id: string) => `/dashboard/bookings/${id}`,
  USERS: "/dashboard/users",
  SHIFT_SETTINGS: "/dashboard/shift-settings",
  NOTIFICATIONS: "/dashboard/notifications",
  ALEXA: "/alexa",
} as const;

export const DEFAULT_TIME_ZONE = "Asia/Karachi";

export const TIME_ZONES = [
  { value: "Asia/Karachi", label: "Pakistan (Asia/Karachi)" },
  { value: "Asia/Dubai", label: "UAE (Asia/Dubai)" },
  { value: "Asia/Kolkata", label: "India (Asia/Kolkata)" },
  { value: "Asia/Singapore", label: "Singapore (Asia/Singapore)" },
  { value: "Europe/London", label: "UK (Europe/London)" },
  { value: "Europe/Paris", label: "Central Europe (Europe/Paris)" },
  { value: "America/New_York", label: "US Eastern (America/New_York)" },
  { value: "America/Chicago", label: "US Central (America/Chicago)" },
  { value: "America/Los_Angeles", label: "US Pacific (America/Los_Angeles)" },
  { value: "UTC", label: "UTC" },
] as const;

export const WEEKDAYS = [
  { value: 0, label: "Mo", full: "Monday" },
  { value: 1, label: "Tu", full: "Tuesday" },
  { value: 2, label: "We", full: "Wednesday" },
  { value: 3, label: "Th", full: "Thursday" },
  { value: 4, label: "Fr", full: "Friday" },
  { value: 5, label: "Sa", full: "Saturday" },
  { value: 6, label: "Su", full: "Sunday" },
] as const;

export const ROLES = {
  ADMIN: "admin",
  STAFF: "staff",
  CLIENT: "client",
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];
