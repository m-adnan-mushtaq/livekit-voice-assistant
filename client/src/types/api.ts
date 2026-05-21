import type { RoleName } from "../common";

export type ApiResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};

export type Role = {
  id: string;
  name: RoleName;
};

export type User = {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  role: Role | RoleName;
  last_login_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type AuthTokens = {
  access: {
    token: string;
    expires: string;
  };
};

export type LoginResponse = {
  user: User;
  tokens: AuthTokens;
};

export type PaginationMeta = {
  total: number;
  limit: number;
  offset: number;
  page: number;
  total_pages: number;
  total_results: number;
  sort_by?: string;
  sort_order?: string;
  search?: string | null;
};

export type PaginatedUsers = {
  meta: PaginationMeta;
  data: User[];
};

export type BookingPerson = {
  id: string;
  full_name: string;
  email: string;
};

export type Booking = {
  id: string;
  customer: BookingPerson;
  staff: BookingPerson;
  start_time: string;
  end_time: string;
  status: string;
  session_type: string;
  meeting_url?: string | null;
};

export type LiveKitTokenData = {
  token: string;
  room_name: string;
  agent_name: string;
};
