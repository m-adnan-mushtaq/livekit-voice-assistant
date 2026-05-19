type TalkToAlexaButtonProps = {
  variant?: "primary" | "secondary" | "header" | "cta";
  className?: string;
};

export default function TalkToAlexaButton({
  variant = "primary",
  className = "",
}: TalkToAlexaButtonProps) {
  const scrollToHero = () => {
    const heroInput = document.getElementById("hero-name-input");
    if (heroInput) {
      heroInput.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => heroInput.focus(), 500);
    }
  };

  const baseStyles = {
    header:
      "bg-primary text-on-primary px-md py-sm rounded-full text-label-md hover:bg-primary-fixed-dim transition-all",
    primary:
      "primary-gradient text-on-primary text-label-md px-xl py-md rounded-full hover:scale-105 transition-transform",
    secondary:
      "border border-white/20 text-on-surface text-label-md px-xl py-md rounded-full hover:bg-white/5 transition-colors",
    cta: "bg-on-primary-container text-primary px-xl py-md rounded-full text-label-md hover:scale-105 transition-transform shadow-xl shadow-black/20",
  };

  return (
    <button
      onClick={scrollToHero}
      className={`${baseStyles[variant]} ${className} active:scale-95`}
    >
      Talk with Alexa
    </button>
  );
}
