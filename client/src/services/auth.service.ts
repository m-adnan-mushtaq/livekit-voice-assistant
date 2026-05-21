import { api, unwrapApi } from "./api";
import type { LoginResponse, User } from "../types/api";
import type { LoginFormValues, SignUpFormValues } from "../schema/auth.schema";

export async function login(payload: LoginFormValues) {
  return unwrapApi<LoginResponse>(
    api.post("/auth/login", payload),
  );
}

export async function register(payload: SignUpFormValues) {
  return unwrapApi<User>(api.post("/auth/register", payload));
}
