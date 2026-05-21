import { Link } from "react-router";
import { BRAND } from "../landing/shared/constants";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container py-stack-lg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-4 px-container-padding-mobile md:flex-row md:space-y-0 md:px-container-padding-desktop">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="mb-2 font-display-lg text-headline-sm text-primary">
            {BRAND.name}
          </Link>
          <p className="font-body-sm text-on-surface-variant">
            © 2024 {BRAND.name}. {BRAND.tagline}
          </p>
        </div>

        <div className="flex space-x-8">
          {["Privacy Policy", "Terms of Service", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-body-sm text-on-surface-variant transition-colors hover:text-primary"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
