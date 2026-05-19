import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";
import "@livekit/components-styles";

import { LIVEKIT_URL } from "../lib/livekit";
import { useAlexaConnection } from "../hooks/useAlexaConnection";
import YogaCallRoom from "./yoga-room";

type LocationState = {
  token?: string;
  name?: string;
} | null;

export default function YogaAgentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const {
    name,
    setName,
    token: hookToken,
    setError,
    endCall: hookEndCall,
  } = useAlexaConnection();

  const [activeToken, setActiveToken] = useState(state?.token || "");

  useEffect(() => {
    if (state?.token) {
      setActiveToken(state.token);
    }
    if (state?.name) {
      setName(state.name);
    }
  }, [state, setName]);

  useEffect(() => {
    if (hookToken && !activeToken) {
      setActiveToken(hookToken);
    }
  }, [hookToken, activeToken]);

  const endCall = useCallback(() => {
    hookEndCall();
    setActiveToken("");
    navigate("/", { replace: true });
  }, [hookEndCall, navigate]);

  useEffect(() => {
    if (!activeToken && !state?.token) {
      navigate("/", { replace: true });
    }
  }, [activeToken, state, navigate]);

  if (!activeToken) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <span className="text-on-surface-variant">Connecting...</span>
        </div>
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={activeToken}
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
