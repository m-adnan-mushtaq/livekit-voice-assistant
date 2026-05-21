import { Link, Outlet } from "react-router";
import { BRAND } from "../landing/shared/constants";
import { ROUTES } from "../../common";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-container-padding-mobile py-8 md:px-container-padding-desktop">
        <Link
          to={ROUTES.HOME}
          className="mb-8 font-display-lg text-headline-sm text-primary"
        >
          {BRAND.name}
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-xl border border-outline-variant/30 bg-surface-container-low p-8 shadow-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
