import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import Layout from "./components/layout/Layout";
import AuthLayout from "./components/auth/AuthLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import GuestRoute from "./components/routing/GuestRoute";
import { ROLES, ROUTES } from "./common";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));
const YogaAgentPage = lazy(() => import("./yoga/agent-pane"));
const DashboardIndex = lazy(() => import("./pages/dashboard/DashboardIndex"));
const BookingsPage = lazy(() => import("./pages/dashboard/BookingsPage"));
const BookingDetailPage = lazy(
  () => import("./pages/dashboard/BookingDetailPage"),
);
const UsersPage = lazy(() => import("./pages/dashboard/UsersPage"));
const ShiftSettingsPage = lazy(
  () => import("./pages/dashboard/ShiftSettingsPage"),
);
const NotificationsPage = lazy(
  () => import("./pages/dashboard/NotificationsPage"),
);

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        <span className="text-on-surface-variant">Loading...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LandingPage />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN.slice(1)} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP.slice(1)} element={<SignUpPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.DASHBOARD.slice(1)} element={<DashboardIndex />} />
            <Route
              path={ROUTES.BOOKINGS.slice(1)}
              element={<BookingsPage />}
            />
            <Route
              path="dashboard/bookings/:bookingId"
              element={<BookingDetailPage />}
            />
            <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
              <Route path={ROUTES.USERS.slice(1)} element={<UsersPage />} />
              <Route
                path={ROUTES.SHIFT_SETTINGS.slice(1)}
                element={<ShiftSettingsPage />}
              />
            </Route>
            <Route
              path={ROUTES.NOTIFICATIONS.slice(1)}
              element={<NotificationsPage />}
            />
          </Route>
          <Route path={ROUTES.ALEXA.slice(1)} element={<YogaAgentPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
