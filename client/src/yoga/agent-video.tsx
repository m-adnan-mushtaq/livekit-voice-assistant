type AgentVideoPanelProps = {
  state: string;
  statusText: string;
};

export default function AgentVideoPanel({
  state,
  statusText,
}: AgentVideoPanelProps) {
  const isSpeaking = state === "speaking";

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_40%)]" />

      <img
        src="https://i.pinimg.com/originals/42/78/76/42787621ed6d40f0c30f0ae423fc572c.gif"
        className="relative h-[520px] w-full object-contain bg-black"
      />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Alexa</h2>
            <p className="mt-1 text-sm text-neutral-300">Your AI yoga tutor</p>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur">
            <span
              className={`h-3 w-3 rounded-full ${
                isSpeaking ? "animate-pulse bg-emerald-300" : "bg-neutral-500"
              }`}
            />
            <span className="text-sm text-neutral-200">{statusText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
