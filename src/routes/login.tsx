import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({ redirect: z.string().optional() }),
  component: LoginPage,
});

function LoginPage() {
  const { redirect } = Route.useSearch();

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue to Tatvan">
      <AuthCard>
        <LoginForm redirectTo={redirect} />
      </AuthCard>
    </AuthLayout>
  );
}