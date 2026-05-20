type AgentVideoPanelProps = {
  state: string;
  statusText: string;
};

const AGENT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCPxu3Vjg0prCu_3JZ3URfSigEn1JCdGpxkBa-9tm96CVs_mSFbMpeBOsGDKWNwf7S-4a_uv40BsenRYGzeknwnLDkM7Jy_RO8HAKRR_UEFdHGAYdHESvJv7XMZsScmcXtJfUyWDmiHUshFxAvZ65TTh3MtmwDiSxGZbaa2r-H-9Q2ortNOINYCjRL-NUhGPwiyT8-OrTTrvT-nO-lrh0Dvmv1SZY-uJ667M_xz5U9CwDBYBFKZwafxHS_eqY-yFEqHkzMrzOGYKNE";

export default function AgentVideoPanel({
  state,
  statusText,
}: AgentVideoPanelProps) {
  const isSpeaking = state === "speaking";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-lowest soft-ambient-shadow">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,183,154,0.2),transparent_40%)]" />

      <img
        src={AGENT_IMAGE}
        alt="Alexa yoga assistant"
        className="relative h-[520px] w-full object-cover"
      />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-sm text-on-surface">Alexa</h2>
            <p className="mt-1 font-body-md text-on-surface-variant">
              Your AI yoga assistant
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-outline-variant/30 bg-surface-container-lowest/90 px-4 py-2 glass-nav">
            <span
              className={`h-3 w-3 rounded-full ${
                isSpeaking
                  ? "pulse-dot bg-primary-container"
                  : "bg-outline-variant"
              }`}
            />
            <span className="font-body-md text-on-surface">{statusText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
