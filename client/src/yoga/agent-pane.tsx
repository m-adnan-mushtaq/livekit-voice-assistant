import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";
import "@livekit/components-styles";

import { LIVEKIT_URL, ROUTES } from "../common";
import YogaCallRoom from "./yoga-room";

type LocationState = {
  token?: string;
  name?: string;
} | null;

export default function YogaAgentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [activeToken, setActiveToken] = useState(state?.token || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (state?.token) setActiveToken(state.token);
  }, [state]);

  const endCall = useCallback(() => {
    setActiveToken("");
    navigate(ROUTES.BOOKINGS, { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!activeToken) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [activeToken, navigate]);

  if (!activeToken) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-primary-container pulse-dot" />
          <span className="text-on-surface-variant font-body-md">
            Connecting...
          </span>
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
      onError={() => {
        setError("LiveKit connection failed. Please try again.");
        endCall();
      }}
      onMediaDeviceFailure={() => {
        setError("Microphone access failed. Check browser permissions.");
      }}
      connectOptions={{
        autoSubscribe: true,
        maxRetries: 5,
      }}
      className="min-h-screen bg-background text-on-background"
    >
      <RoomAudioRenderer />
      <StartAudio
        label="Enable audio"
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary text-on-primary px-5 py-3 text-sm font-semibold soft-ambient-shadow"
      />
      {error && (
        <p className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-error-container px-4 py-2 text-sm text-on-error-container">
          {error}
        </p>
      )}
      <YogaCallRoom onEndCall={endCall} />
    </LiveKitRoom>
  );
}
