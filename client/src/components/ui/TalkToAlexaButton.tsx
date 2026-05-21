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
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new Event("open-alexa-connect"));
    setTimeout(() => {
      document.getElementById("hero-name-input")?.focus();
    }, 600);
  };

  const baseStyles = {
    header:
      "bg-primary text-on-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-primary/90 active:scale-95 transition-all",
    primary:
      "bg-primary text-on-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-primary/90 transition-all",
    secondary:
      "border border-primary text-primary px-10 py-4 rounded-full font-label-caps text-label-caps hover:bg-primary/5 transition-all",
    cta: "bg-primary text-on-primary px-12 py-4 rounded-full font-label-caps text-label-caps hover:bg-primary/90 transition-all",
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
