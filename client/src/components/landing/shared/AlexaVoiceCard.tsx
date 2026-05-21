import AlexaVoiceOrb from "../../shared/AlexaVoiceOrb";

export default function AlexaVoiceCard() {
  return (
    <div className="relative mx-auto mt-10 max-w-sm">
      <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest/95 shadow-[0_20px_40px_rgba(168,203,183,0.15)] backdrop-blur-sm">
        <div className="flex justify-center bg-surface-container-low py-8">
          <AlexaVoiceOrb size="md" />
        </div>

        <div className="p-5 text-left">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="pulse-dot h-2.5 w-2.5 shrink-0 rounded-full bg-primary-container" />
            <span className="font-label-caps text-label-caps text-primary">
              Available now
            </span>
          </div>
          <p className="font-body-md italic text-on-surface-variant">
            &ldquo;Talk to Alexa about your goals, explore available slots, and
            book a private 1:1 session with a real instructor.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
