import { useCallback, useMemo, useState } from "react";
import {
  useVoiceAssistant,
  useLocalParticipant,
  useTranscriptions,
  type TextStreamData,
  type VoiceAssistant,
} from "@livekit/components-react";

import AgentPanel from "./agent-panel";
import TranscriptPanel from "./transcription-panel";
import RoomHeader from "./room-header";
import RoomFooter from "./room-footer";

type YogaCallRoomProps = {
  onEndCall: () => void;
};

export type TranscriptMessage = {
  id: string;
  type: "agent" | "user";
  text: string;
  timestamp: number;
};

type AgentTranscription = VoiceAssistant["agentTranscriptions"][number];

export default function YogaCallRoom({ onEndCall }: YogaCallRoomProps) {
  const { state } = useVoiceAssistant();
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const { agentTranscriptions } = useVoiceAssistant();
  const localIdentity = localParticipant.identity;
  const userTranscriptions = useTranscriptions({
    participantIdentities: localIdentity ? [localIdentity] : [],
  });
  const [isPaused, setIsPaused] = useState(false);

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
    if (state === "speaking") return "Speaking…";
    if (state === "thinking") return "Thinking…";
    if (state === "listening") return "Listening…";
    if (state === "connecting") return "Connecting…";
    if (state === "failed") return "Unavailable";
    return "Connected";
  }, [state]);

  const toggleMic = useCallback(async () => {
    await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
  }, [localParticipant, isMicrophoneEnabled]);

  const toggleSession = useCallback(async () => {
    if (isPaused) {
      await localParticipant.setMicrophoneEnabled(true);
      setIsPaused(false);
      return;
    }
    await localParticipant.setMicrophoneEnabled(false);
    setIsPaused(true);
  }, [isPaused, localParticipant]);

  return (
    <>
      <RoomHeader />
      <main className="flex min-h-screen flex-col pt-20 md:flex-row">
        <AgentPanel
          state={state}
          statusText={statusText}
          isMicEnabled={isMicrophoneEnabled && !isPaused}
          isPaused={isPaused}
          onToggleMic={toggleMic}
          onToggleSession={toggleSession}
          onLeaveRoom={onEndCall}
        />
        <TranscriptPanel messages={messages} />
      </main>
      <RoomFooter />
    </>
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
