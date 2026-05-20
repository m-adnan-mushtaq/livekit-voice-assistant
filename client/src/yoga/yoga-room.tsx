import { useMemo } from "react";
import {
  useVoiceAssistant,
  useLocalParticipant,
  useTranscriptions,
  type TextStreamData,
  type VoiceAssistant,
} from "@livekit/components-react";

import AgentVideoPanel from "./agent-video";
import UserPanel from "./user-panel";
import TranscriptPanel from "./transcription-panel";

type YogaCallRoomProps = {
  userName: string;
  onEndCall: () => void;
};

export type TranscriptMessage = {
  id: string;
  type: "agent" | "user";
  text: string;
  timestamp: number;
};

type AgentTranscription = VoiceAssistant["agentTranscriptions"][number];

export default function YogaCallRoom({ userName, onEndCall }: YogaCallRoomProps) {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
  const localParticipant = useLocalParticipant();
  const localIdentity = localParticipant.localParticipant.identity;
  const userTranscriptions = useTranscriptions({
    participantIdentities: localIdentity ? [localIdentity] : [],
  });

  const messages = useMemo<TranscriptMessage[]>(() => {
    return [
      ...agentTranscriptions.map((transcription) =>
        toTranscriptMessage(transcription, "agent"),
      ),
      ...userTranscriptions.map((transcription) =>
        toTranscriptMessage(transcription, "user"),
      ),
    ].sort((a, b) => a.timestamp - b.timestamp);
  }, [agentTranscriptions, userTranscriptions]);

  const statusText = useMemo(() => {
    if (state === "speaking") return "Alexa is speaking";
    if (state === "thinking") return "Alexa is thinking";
    if (state === "listening") return "Alexa is listening";
    if (state === "connecting") return "Connecting to Alexa";
    if (state === "failed") return "Alexa is unavailable";
    return "Connected";
  }, [state]);

  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-label-sm text-primary tracking-wider uppercase">
              Serene Flow Yoga
            </p>
            <h1 className="font-headline-sm text-on-surface mt-1">
              Live Yoga Assistant
            </h1>
          </div>

          <button
            type="button"
            onClick={onEndCall}
            className="rounded-2xl border border-error/30 bg-error-container/30 px-5 py-3 text-sm font-semibold text-error transition hover:bg-error-container/50"
          >
            End Call
          </button>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <AgentVideoPanel state={state} statusText={statusText} />
          <UserPanel
            userName={userName}
            state={state}
            audioTrack={audioTrack}
            isMicEnabled={localParticipant.isMicrophoneEnabled}
          />
        </section>

        <TranscriptPanel messages={messages} />
      </div>
    </main>
  );
}

function toTranscriptMessage(
  transcription: AgentTranscription,
  type: "agent",
): TranscriptMessage;
function toTranscriptMessage(
  transcription: TextStreamData,
  type: "user",
): TranscriptMessage;
function toTranscriptMessage(
  transcription: AgentTranscription | TextStreamData,
  type: "agent" | "user",
): TranscriptMessage {
  if ("streamInfo" in transcription) {
    return {
      id: transcription.streamInfo.id,
      text: transcription.text,
      timestamp: transcription.streamInfo.timestamp,
      type,
    };
  }

  return {
    id: transcription.id,
    text: transcription.text,
    timestamp: transcription.firstReceivedTime ?? transcription.receivedAt,
    type,
  };
}
