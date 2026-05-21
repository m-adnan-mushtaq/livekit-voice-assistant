import { Navigate, Outlet } from "react-router";
import { ROUTES } from "../../common";
import { useAuth } from "../../context/AuthContext";
import type { RoleName } from "../../common";

type ProtectedRouteProps = {
  roles?: RoleName[];
};

export default function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, role } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="text-on-surface-variant">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (roles && role && !roles.includes(role)) {
    return <Navigate to={ROUTES.BOOKINGS} replace />;
  }

  return <Outlet />;
}
