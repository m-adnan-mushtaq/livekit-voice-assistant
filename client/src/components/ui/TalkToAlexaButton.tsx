type TalkToAlexaButtonProps = {
  variant?: "primary" | "secondary" | "header" | "cta";
  className?: string;
  label?: string;
};

export default function TalkToAlexaButton({
  variant = "primary",
  className = "",
  label = "Talk with Alexa",
}: TalkToAlexaButtonProps) {
  const scrollToHero = () => {
    const home = document.getElementById("home");
    home?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(new Event("open-alexa-connect"));

    setTimeout(() => {
      document.getElementById("hero-name-input")?.focus();
    }, 600);
  };

  const baseStyles = {
    header:
      "bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:opacity-90 active:scale-95 transition-all",
    primary:
      "bg-primary text-on-primary px-10 py-4 rounded-full font-label-md soft-ambient-shadow hover:-translate-y-0.5 transition-all",
    secondary:
      "bg-surface-container-lowest text-primary border border-primary-container/30 px-10 py-4 rounded-full font-label-md hover:bg-white transition-all",
    cta: "bg-primary text-on-primary px-10 py-4 rounded-full font-label-md soft-ambient-shadow hover:-translate-y-0.5 transition-all",
  };

  return (
    <button
      type="button"
      onClick={scrollToHero}
      className={`${baseStyles[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
