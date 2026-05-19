import { useCallback, useRef, useState } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";
import "@livekit/components-styles";

import { LIVEKIT_URL, fetchLiveKitToken } from "../lib/livekit";
import YogaHero from "./hero";
import YogaCallRoom from "./yoga-room";

export default function YogaAgentPage() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const tokenRequestRef = useRef<AbortController | null>(null);

  const endCall = useCallback(() => {
    tokenRequestRef.current?.abort();
    tokenRequestRef.current = null;
    setToken("");
    setIsConnecting(false);
  }, []);

  const startCall = async () => {
    tokenRequestRef.current?.abort();
    const controller = new AbortController();
    tokenRequestRef.current = controller;

    try {
      setError("");
      setIsConnecting(true);

      const newToken = await fetchLiveKitToken(name, {
        signal: controller.signal,
      });
      setToken(newToken);
    } catch (err) {
      if (controller.signal.aborted) return;
      console.error(err);
      setError("Could not start the call. Please try again.");
    } finally {
      if (tokenRequestRef.current === controller) {
        tokenRequestRef.current = null;
        setIsConnecting(false);
      }
    }
  };

  if (!token) {
    return (
      <YogaHero
        name={name}
        setName={setName}
        onStart={startCall}
        isConnecting={isConnecting}
        error={error}
      />
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={LIVEKIT_URL}
      connect={true}
      audio={true}
      video={false}
      onDisconnected={endCall}
      onError={(err) => {
        console.error(err);
        setError("LiveKit connection failed. Please try again.");
        endCall();
      }}
      onMediaDeviceFailure={(failure, kind) => {
        console.error("LiveKit media device failure", failure, kind);
        setError("Microphone access failed. Check browser permissions.");
      }}
      connectOptions={{
        autoSubscribe: true,
        maxRetries: 5,
      }}
      className="min-h-screen bg-neutral-950 text-white"
    >
      <RoomAudioRenderer />
      <StartAudio
        label="Enable audio"
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-neutral-950 shadow-xl"
      />
      <YogaCallRoom userName={name || "Guest"} onEndCall={endCall} />
    </LiveKitRoom>
  );
}
