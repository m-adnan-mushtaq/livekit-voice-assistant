import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { loginSchema, type LoginFormValues } from "../../schema/auth.schema";
import { ROUTES } from "../../common";
import { getApiErrorMessage } from "../../services/api";

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  isLoading?: boolean;
};

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values);
    } catch (err) {
      setError("root", {
        message: getApiErrorMessage(err, "Login failed. Try again."),
      });
    }
  });

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <h1 className="font-display-lg text-headline-md text-on-surface">
          Welcome back
        </h1>
        <p className="mt-2 font-body-md text-on-surface-variant">
          Sign in to manage bookings and talk with Alexa.
        </p>
      </div>

      <label className="block space-y-2">
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          Email
        </span>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-xl border border-outline-variant/40 bg-surface px-4 py-3 outline-none focus:border-primary"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-sm text-error">{errors.email.message}</p>
        )}
      </label>

      <label className="block space-y-2">
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          Password
        </span>
        <input
          type="password"
          {...register("password")}
          className="w-full rounded-xl border border-outline-variant/40 bg-surface px-4 py-3 outline-none focus:border-primary"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-sm text-error">{errors.password.message}</p>
        )}
      </label>

      {errors.root && (
        <p className="text-sm text-error">{errors.root.message}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full bg-primary px-6 py-3 font-label-caps text-label-caps text-on-primary transition hover:bg-primary/90 disabled:opacity-60"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center font-body-sm text-on-surface-variant">
        New here?{" "}
        <Link to={ROUTES.SIGNUP} className="text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
