import { Navigate } from "react-router";
import { ROUTES, ROLES } from "../../common";
import { useAuth } from "../../context/AuthContext";
import ClientHomePage from "./ClientHomePage";

export default function DashboardIndex() {
  const { role } = useAuth();

  if (role === ROLES.CLIENT) {
    return <ClientHomePage />;
  }
  if (role === ROLES.ADMIN) {
    return <Navigate to={ROUTES.USERS} replace />;
  }
  return <Navigate to={ROUTES.BOOKINGS} replace />;
}
