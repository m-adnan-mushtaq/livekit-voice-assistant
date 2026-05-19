import { useCallback, useRef, useState, useEffect } from "react";
import { fetchLiveKitToken } from "../lib/livekit";

const STORAGE_KEY = "yoga_user_name";

export function useAlexaConnection() {
  const [name, setNameState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "";
  });
  const [token, setToken] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const tokenRequestRef = useRef<AbortController | null>(null);

  const setName = useCallback((newName: string) => {
    setNameState(newName);
    if (newName.trim()) {
      localStorage.setItem(STORAGE_KEY, newName.trim());
    }
  }, []);

  const endCall = useCallback(() => {
    tokenRequestRef.current?.abort();
    tokenRequestRef.current = null;
    setToken("");
    setIsConnecting(false);
  }, []);

  const startCall = useCallback(async (userName?: string) => {
    const callName = userName?.trim() || name.trim();
    if (!callName) {
      setError("Please enter your name");
      return null;
    }

    tokenRequestRef.current?.abort();
    const controller = new AbortController();
    tokenRequestRef.current = controller;

    try {
      setError("");
      setIsConnecting(true);

      if (userName) {
        setName(userName);
      }

      const newToken = await fetchLiveKitToken(callName, {
        signal: controller.signal,
      });
      setToken(newToken);
      return newToken;
    } catch (err) {
      if (controller.signal.aborted) return null;
      console.error(err);
      setError("Could not start the call. Please try again.");
      return null;
    } finally {
      if (tokenRequestRef.current === controller) {
        tokenRequestRef.current = null;
        setIsConnecting(false);
      }
    }
  }, [name, setName]);

  useEffect(() => {
    return () => {
      tokenRequestRef.current?.abort();
    };
  }, []);

  return {
    name,
    setName,
    token,
    setToken,
    isConnecting,
    error,
    setError,
    startCall,
    endCall,
    hasStoredName: Boolean(localStorage.getItem(STORAGE_KEY)),
  };
}
