import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { BRAND } from "../landing/shared/constants";
import { ROUTES, ROLES } from "../../common";
import { useAuth } from "../../context/AuthContext";
import { useAlexaRoom } from "../../hooks/useAlexaRoom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-xl px-4 py-3 font-label-caps text-label-caps transition ${
    isActive
      ? "bg-primary-container text-on-primary-container"
      : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
  }`;

export default function DashboardLayout() {
  const { user, role, logout } = useAuth();
  const { joinAlexaRoom, isConnecting } = useAlexaRoom();
  const navigate = useNavigate();

  const navItems = [
    ...(role === ROLES.ADMIN
      ? [{ to: ROUTES.USERS, label: "Users" }]
      : role === ROLES.CLIENT
        ? [{ to: ROUTES.DASHBOARD, label: "Home" }]
        : []),
    { to: ROUTES.BOOKINGS, label: "Bookings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-outline-variant/30 bg-surface-container-low p-6 md:flex">
          <Link to={ROUTES.HOME} className="font-display-lg text-headline-sm text-primary">
            {BRAND.name}
          </Link>
          <p className="mt-2 truncate font-body-sm text-on-surface-variant">
            {user?.name}
          </p>
          <nav className="mt-8 flex flex-1 flex-col gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => void joinAlexaRoom()}
            disabled={isConnecting}
            className="mt-4 w-full rounded-full bg-primary px-4 py-3 font-label-caps text-label-caps text-on-primary hover:bg-primary/90 disabled:opacity-60"
          >
            {isConnecting ? "Connecting..." : "Talk with Alexa"}
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate(ROUTES.LOGIN);
            }}
            className="mt-3 font-body-sm text-on-surface-variant hover:text-primary"
          >
            Sign out
          </button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-outline-variant/30 px-4 py-4 md:px-8">
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant">
                Dashboard
              </p>
              <h1 className="font-headline-md text-headline-sm text-on-surface">
                {user?.name}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:hidden">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 text-sm ${
                      isActive ? "bg-primary text-on-primary" : "border border-outline-variant"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={() => void joinAlexaRoom()}
                disabled={isConnecting}
                className="rounded-full bg-primary px-4 py-2 text-sm text-on-primary"
              >
                Alexa
              </button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
