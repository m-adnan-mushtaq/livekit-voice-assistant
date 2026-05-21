import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEYS, STORAGE_KEYS, type RoleName } from "../common";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";
import type { LoginFormValues } from "../schema/auth.schema";
import type { User } from "../types/api";
import { getUserRole } from "../utils/user";

type AuthContextValue = {
  user: User | null | undefined;
  role: ReturnType<typeof getUserRole>;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginFormValues) => Promise<RoleName | null>;
  logout: () => void;
  loginError: string | null;
  isLoggingIn: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const hasToken = Boolean(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN));

  const meQuery = useQuery({
    queryKey: [CACHE_KEYS.ME],
    queryFn: userService.fetchMe,
    enabled: hasToken,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        data.tokens.access.token,
      );
      queryClient.setQueryData([CACHE_KEYS.ME], data.user);
    },
  });

  const login = useCallback(
    async (payload: LoginFormValues) => {
      const data = await loginMutation.mutateAsync(payload);
      return getUserRole(data.user);
    },
    [loginMutation],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    queryClient.clear();
  }, [queryClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: hasToken ? meQuery.data ?? null : null,
      role: getUserRole(meQuery.data ?? null),
      isAuthenticated: Boolean(hasToken && meQuery.data),
      isLoading: hasToken && meQuery.isLoading,
      login,
      logout,
      loginError: loginMutation.error
        ? "Login failed. Check your email and password."
        : null,
      isLoggingIn: loginMutation.isPending,
    }),
    [
      hasToken,
      meQuery.data,
      meQuery.isLoading,
      login,
      logout,
      loginMutation.error,
      loginMutation.isPending,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
