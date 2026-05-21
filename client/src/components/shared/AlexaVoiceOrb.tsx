import { ASSETS } from "../../lib/assets";

type AlexaVoiceOrbProps = {
  className?: string;
  size?: "md" | "lg";
};

const sizeClasses = {
  md: "h-48 w-48",
  lg: "h-64 w-64 md:h-80 md:w-80",
};

export default function AlexaVoiceOrb({
  className = "",
  size = "lg",
}: AlexaVoiceOrbProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      <div
        className="orb-pulse absolute inset-0 rounded-full bg-primary/20 blur-xl"
        aria-hidden
      />
      <div className="relative z-20 h-full w-full overflow-hidden rounded-full border border-primary-container/30 shadow-[0_0_60px_rgba(168,203,183,0.25)]">
        <img
          src={ASSETS.heroImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={ASSETS.heroImage}
          className="relative h-full w-full object-cover mix-blend-multiply"
          aria-label="Alexa voice assistant animation"
        >
          <source src={ASSETS.pulseVoice} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
