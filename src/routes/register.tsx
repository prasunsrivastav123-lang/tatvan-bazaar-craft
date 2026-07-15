import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const Route = createFileRoute("/register")({
  validateSearch: z.object({ redirect: z.string().optional() }),
  component: RegisterPage,
});

function RegisterPage() {
  const { redirect } = Route.useSearch();

  return (
    <AuthLayout title="Create your account" subtitle="Join Tatvan for a purer everyday">
      <AuthCard>
        <RegisterForm redirectTo={redirect} />
      </AuthCard>
    </AuthLayout>
  );
}