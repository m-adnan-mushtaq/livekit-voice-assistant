import { useState } from "react";
import { useNavigate } from "react-router";
import SignUpForm from "../../components/auth/SignUpForm";
import * as authService from "../../services/auth.service";
import { ROUTES } from "../../common";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (
    values: Parameters<typeof authService.register>[0],
  ) => {
    setIsLoading(true);
    try {
      await authService.register(values);
      navigate(ROUTES.LOGIN, {
        replace: true,
        state: { message: "Account created. Please sign in." },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />;
}
