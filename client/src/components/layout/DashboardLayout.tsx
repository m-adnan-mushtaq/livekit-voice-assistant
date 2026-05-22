import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { BRAND } from "../landing/shared/constants";
import { ROUTES, ROLES } from "../../common";
import { useAuth } from "../../context/AuthContext";
import { useAlexaRoom } from "../../hooks/useAlexaRoom";
import NotificationBell from "../notifications/NotificationBell";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-xl px-4 py-3 text-left font-label-caps text-label-caps transition ${
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
      ? [
          { to: ROUTES.USERS, label: "Users" },
          { to: ROUTES.SHIFT_SETTINGS, label: "Shift settings" },
        ]
      : role === ROLES.CLIENT
        ? [{ to: ROUTES.DASHBOARD, label: "Home" }]
        : []),
    { to: ROUTES.BOOKINGS, label: "Bookings" },
    ...(role === ROLES.CLIENT
      ? [{ to: ROUTES.NOTIFICATIONS, label: "Notifications" }]
      : []),
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-outline-variant/30 bg-surface-container-low md:flex">
        <div className="shrink-0 p-6 pb-4">
          <Link
            to={ROUTES.HOME}
            className="block text-left font-display-lg text-headline-sm text-primary"
          >
            {BRAND.name}
          </Link>
          <p className="mt-2 truncate text-left font-body-sm text-on-surface-variant">
            {user?.name}
          </p>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-6">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="shrink-0 space-y-3 border-t border-outline-variant/20 p-6">
          <button
            type="button"
            onClick={() => void joinAlexaRoom()}
            disabled={isConnecting}
            className="w-full rounded-full bg-primary px-4 py-3 text-left font-label-caps text-label-caps text-on-primary hover:bg-primary/90 disabled:opacity-60"
          >
            {isConnecting ? "Connecting..." : "Talk with Alexa"}
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate(ROUTES.LOGIN);
            }}
            className="w-full text-left font-body-sm text-on-surface-variant hover:text-primary"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-between border-b border-outline-variant/30 px-4 py-4 md:px-8">
          <div className="min-w-0 text-left">
            <p className="font-label-caps text-label-caps text-on-surface-variant">
              Dashboard
            </p>
            <h1 className="truncate font-headline-md text-headline-sm text-on-surface">
              {user?.name}
            </h1>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
            {role === ROLES.CLIENT && <NotificationBell />}
            <div className="flex flex-wrap items-center gap-2 md:hidden">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 text-sm ${
                      isActive
                        ? "bg-primary text-on-primary"
                        : "border border-outline-variant"
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
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="w-full max-w-7xl p-4 text-left md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
