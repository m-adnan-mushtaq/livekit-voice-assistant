import { Navigate, Outlet } from "react-router";
import { ROUTES, ROLES } from "../../common";
import { useAuth } from "../../context/AuthContext";

export default function GuestRoute() {
  const { isAuthenticated, isLoading, role } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="text-on-surface-variant">Loading...</span>
      </div>
    );
  }

  if (isAuthenticated) {
    const path =
      role === ROLES.ADMIN
        ? ROUTES.USERS
        : role === ROLES.CLIENT
          ? ROUTES.DASHBOARD
          : ROUTES.BOOKINGS;
    return <Navigate to={path} replace />;
  }

  return <Outlet />;
}
