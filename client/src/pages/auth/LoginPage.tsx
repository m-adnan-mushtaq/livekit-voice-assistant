import { useLocation, useNavigate } from "react-router";
import LoginForm from "../../components/auth/LoginForm";
import { useAuth } from "../../context/AuthContext";
import { ROUTES, ROLES } from "../../common";

function dashboardPath(role: string | null) {
  if (role === ROLES.ADMIN) return ROUTES.USERS;
  if (role === ROLES.CLIENT) return ROUTES.DASHBOARD;
  return ROUTES.BOOKINGS;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const signupMessage = (location.state as { message?: string } | null)?.message;
  const { login, isLoggingIn } = useAuth();

  const handleLogin = async (values: Parameters<typeof login>[0]) => {
    const userRole = await login(values);
    navigate(dashboardPath(userRole), { replace: true });
  };

  return (
    <>
      {signupMessage && (
        <p className="mb-4 rounded-xl bg-primary-container/40 px-4 py-3 text-sm text-on-primary-container">
          {signupMessage}
        </p>
      )}
      <LoginForm onSubmit={handleLogin} isLoading={isLoggingIn} />
    </>
  );
}
