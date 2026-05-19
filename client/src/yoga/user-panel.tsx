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
    <div className="rounded-[2rem] border border-white/10 bg-neutral-900 p-6 shadow-2xl">
      <div className="flex h-full min-h-[520px] flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Participant</p>
              <h2 className="mt-1 text-2xl font-semibold">{userName}</h2>
            </div>

            <div
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isMicEnabled
                  ? "bg-emerald-400/10 text-emerald-300"
                  : "bg-red-400/10 text-red-300"
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
            <div className="relative grid h-44 w-44 place-items-center rounded-full border border-white/10 bg-white/[0.03]">
              <div className="absolute inset-4 rounded-full border border-emerald-400/10" />
              <div className="grid h-24 w-24 place-items-center rounded-full bg-emerald-400 text-4xl font-bold text-neutral-950">
                {userName?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-neutral-950 p-5">
          <p className="mb-4 text-sm text-neutral-400">Agent audio</p>

          {audioTrack ? (
            <BarVisualizer
              state={state}
              track={audioTrack}
              barCount={7}
              className="flex h-4!  w-full items-center justify-center gap-2"
            >
              <span className="block w-2 rounded-full bg-emerald-300 data-[lk-highlighted=true]:bg-emerald-100" />
            </BarVisualizer>
          ) : (
            <div className="flex h-16 items-center justify-center rounded-2xl bg-white/[0.03] text-sm text-neutral-500">
              Waiting for Alexa...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
