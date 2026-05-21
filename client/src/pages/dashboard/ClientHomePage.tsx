import { useAlexaRoom } from "../../hooks/useAlexaRoom";

export default function ClientHomePage() {
  const { joinAlexaRoom, isConnecting, error } = useAlexaRoom();

  return (
    <div className="max-w-2xl">
      <h2 className="font-display-lg text-headline-md text-on-surface">
        Your yoga studio
      </h2>
      <p className="mt-3 font-body-md text-on-surface-variant">
        Book a private session by talking with Alexa, then view your schedule
        in Bookings.
      </p>
      <button
        type="button"
        onClick={() => void joinAlexaRoom()}
        disabled={isConnecting}
        className="mt-8 rounded-full bg-primary px-8 py-4 font-label-caps text-label-caps text-on-primary hover:bg-primary/90 disabled:opacity-60"
      >
        {isConnecting ? "Connecting..." : "Talk with Alexa"}
      </button>
      {error && <p className="mt-3 text-sm text-error">{error}</p>}
    </div>
  );
}
