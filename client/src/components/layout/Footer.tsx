import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-surface-container py-stack-lg mt-stack-xl">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <Link to="/" className="font-headline-sm text-primary">
              Serene Flow Yoga
            </Link>
            <p className="font-body-md text-on-surface-variant mt-2">
              Gentle online yoga for everyone.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <a
              href="#"
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-md text-on-surface-variant">
            © 2024 Serene Flow Yoga. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white border border-outline-variant/20 flex items-center justify-center text-primary hover:text-on-primary hover:bg-primary transition-all"
              aria-label="Website"
            >
              <span className="material-symbols-outlined text-xl">language</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white border border-outline-variant/20 flex items-center justify-center text-primary hover:text-on-primary hover:bg-primary transition-all"
              aria-label="Share"
            >
              <span className="material-symbols-outlined text-xl">share</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
