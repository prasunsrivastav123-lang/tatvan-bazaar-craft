import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { PasswordInput } from "./PasswordInput";
import { GoogleLoginButton } from "./GoogleLoginButton";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      await login(values.email, values.password);
      navigate({ to: redirectTo ?? "/" });
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  function continueAsGuest() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("tatvan_guest", "true");
    }
    navigate({ to: redirectTo ?? "/" });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Password
          </label>
          <button
            type="button"
            onClick={() => toast.info("Password reset is coming soon — please contact support for now.")}
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <PasswordInput {...register("password")} placeholder="••••••••" />
        {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitting ? "Signing in..." : "Sign in"}
      </button>

      <div className="relative py-2 text-center text-xs uppercase tracking-widest text-muted-foreground">
        <span className="relative bg-background px-3">or</span>
        <div className="absolute left-0 top-1/2 -z-10 h-px w-full bg-border" />
      </div>

      <GoogleLoginButton onDone={() => navigate({ to: redirectTo ?? "/" })} />

      <button
        type="button"
        onClick={continueAsGuest}
        className="w-full text-center text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
      >
        Continue as guest
      </button>

      <p className="text-center text-sm text-muted-foreground">
        New to Tatvan?{" "}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}