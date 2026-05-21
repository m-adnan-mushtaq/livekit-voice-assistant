import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../common";
import { fetchLiveKitToken } from "../services/livekit.service";
import { getApiErrorMessage } from "../services/api";
import { useAuth } from "../context/AuthContext";

export function useAlexaRoom() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");

  const goToLogin = useCallback(() => {
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  const joinAlexaRoom = useCallback(async () => {
    if (!isAuthenticated || !user) {
      goToLogin();
      return;
    }

    setIsConnecting(true);
    setError("");
    try {
      const data = await fetchLiveKitToken(user.id);
      navigate(ROUTES.ALEXA, {
        state: { token: data.token, name: user.name },
      });
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Could not start the voice session. Try again."),
      );
    } finally {
      setIsConnecting(false);
    }
  }, [goToLogin, isAuthenticated, navigate, user]);

  return { joinAlexaRoom, goToLogin, isConnecting, error, isAuthenticated };
}
