import { Link } from "react-router";
import { BRAND } from "../components/landing/shared/constants";

export default function RoomHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/80 glass-nav">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-container-padding-mobile md:px-container-padding-desktop">
        <Link
          to="/"
          className="font-display-lg text-headline-sm tracking-tight text-primary"
        >
          {BRAND.name}
        </Link>

        <nav className="hidden space-x-8 md:flex">
          <Link
            to="/#sessions"
            className="font-label-caps text-label-caps text-on-surface-variant transition-colors hover:text-primary"
          >
            Explore Sessions
          </Link>
          <Link
            to="/#instructors"
            className="font-label-caps text-label-caps text-on-surface-variant transition-colors hover:text-primary"
          >
            Instructors
          </Link>
        </nav>

        <Link
          to="/"
          className="rounded-full bg-primary px-6 py-3 font-label-caps text-label-caps text-on-primary transition-all hover:shadow-lg active:scale-95"
        >
          Book with Alexa
        </Link>
      </div>
    </header>
  );
}
