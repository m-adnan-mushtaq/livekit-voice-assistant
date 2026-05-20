import {
  BarVisualizer,
  ControlBar,
  type AgentState,
  type TrackReference,
} from "@livekit/components-react";

type UserPanelProps = {
  userName: string;
  state: AgentState;
  audioTrack: TrackReference | undefined;
  isMicEnabled: boolean;
};

export default function UserPanel({
  userName,
  state,
  audioTrack,
  isMicEnabled,
}: UserPanelProps) {
  return (
    <div className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-ambient-shadow">
      <div className="flex h-full min-h-[520px] flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-label-md text-on-surface-variant">
                Participant
              </p>
              <h2 className="mt-1 font-headline-sm text-on-surface">
                {userName}
              </h2>
            </div>

            <div
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isMicEnabled
                  ? "bg-primary-container/30 text-primary"
                  : "bg-error-container/50 text-error"
              }`}
            >
              {isMicEnabled ? "Mic on" : "Mic off"}
            </div>
            <ControlBar
              controls={{
                microphone: true,
                camera: false,
                screenShare: false,
                chat: false,
                leave: false,
              }}
            />
          </div>

          <div className="mt-10 grid place-items-center">
            <div className="relative grid h-44 w-44 place-items-center rounded-full border border-outline-variant/30 bg-surface-container-low">
              <div className="absolute inset-4 rounded-full border border-primary-container/40" />
              <div className="grid h-24 w-24 place-items-center rounded-full bg-primary text-4xl font-bold text-on-primary">
                {userName?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-outline-variant/20 bg-surface-container-low p-5">
          <p className="mb-4 font-body-md text-on-surface-variant">
            Agent audio
          </p>

          {audioTrack ? (
            <BarVisualizer
              state={state}
              track={audioTrack}
              barCount={7}
              className="flex h-4! w-full items-center justify-center gap-2"
            >
              <span className="block w-2 rounded-full bg-primary-container data-[lk-highlighted=true]:bg-primary" />
            </BarVisualizer>
          ) : (
            <div className="flex h-16 items-center justify-center rounded-2xl bg-surface-container text-sm text-on-surface-variant">
              Waiting for Alexa...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
