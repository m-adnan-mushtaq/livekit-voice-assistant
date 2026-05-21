import AlexaVoiceOrb from "../components/shared/AlexaVoiceOrb";

type AgentPanelProps = {
  state: string;
  statusText: string;
  isMicEnabled: boolean;
  isPaused: boolean;
  onToggleMic: () => void;
  onToggleSession: () => void;
  onLeaveRoom: () => void;
};

export default function AgentPanel({
  state,
  statusText,
  isMicEnabled,
  isPaused,
  onToggleMic,
  onToggleSession,
  onLeaveRoom,
}: AgentPanelProps) {
  const isActive = !isPaused && state !== "failed";

  return (
    <section className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden bg-surface-container-low p-container-padding-mobile md:min-h-[calc(100vh-5rem)] md:w-1/2 md:p-container-padding-desktop">
      <div
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center">
        <AlexaVoiceOrb size="lg" />

        <div className="mt-8 space-y-2 text-center">
          <h2 className="font-label-caps text-label-caps text-on-surface-variant">
            Alexa Voice Assistant
          </h2>
          <p
            className={`font-body-lg italic ${
              isActive ? "text-primary" : "text-on-surface-variant"
            }`}
          >
            {isPaused ? "Paused" : statusText}
          </p>
        </div>

        <div className="mt-12 flex items-center space-x-6">
          <button
            type="button"
            onClick={onToggleMic}
            aria-label={isMicEnabled ? "Mute microphone" : "Unmute microphone"}
            className={`flex h-16 w-16 items-center justify-center rounded-full border border-outline-variant transition-colors ${
              isMicEnabled
                ? "bg-surface-container-highest hover:bg-surface-variant"
                : "bg-error-container/40 hover:bg-error-container/60"
            }`}
          >
            <span
              className={`material-symbols-outlined ${
                isMicEnabled ? "text-on-surface-variant" : "text-error"
              }`}
            >
              {isMicEnabled ? "mic" : "mic_off"}
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleSession}
            className={`flex items-center space-x-2 rounded-full px-8 py-4 font-label-caps text-label-caps shadow-md transition-all hover:brightness-110 ${
              isPaused
                ? "bg-secondary text-on-secondary"
                : "bg-primary text-on-primary"
            }`}
          >
            <span className="material-symbols-outlined">
              {isPaused ? "play_arrow" : "stop"}
            </span>
            <span>{isPaused ? "Resume Session" : "Stop Session"}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onLeaveRoom}
          className="mt-8 font-body-sm text-on-surface-variant transition-colors hover:text-primary"
        >
          Leave room
        </button>
      </div>
    </section>
  );
}
