import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/5 py-8 sm:py-12 lg:py-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-lg px-4 sm:px-6 lg:px-gutter max-w-[1280px] mx-auto">
        <div>
          <Link
            to="/"
            className="font-headline text-lg sm:text-xl lg:text-headline-sm font-bold text-primary mb-3 sm:mb-4 block"
          >
            Serene Flow Yoga
          </Link>
          <p className="text-on-surface-variant text-xs sm:text-sm opacity-80">
            © 2024 Serene Flow Yoga. AI-Powered Tranquility.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          <h4 className="text-label-md text-on-surface mb-1 sm:mb-2">Links</h4>
          <a
            href="#"
            className="text-on-surface-variant hover:text-secondary transition-colors text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-on-surface-variant hover:text-secondary transition-colors text-sm"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-on-surface-variant hover:text-secondary transition-colors text-sm"
          >
            Contact Us
          </a>
          <a
            href="#"
            className="text-on-surface-variant hover:text-secondary transition-colors text-sm"
          >
            Yoga Styles
          </a>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="text-label-md text-on-surface mb-2 sm:mb-3">Connect</h4>
          <div className="flex gap-3 sm:gap-4">
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all"
            >
              <span className="material-symbols-outlined text-xl">share</span>
            </a>
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all"
            >
              <span className="material-symbols-outlined text-xl">public</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
