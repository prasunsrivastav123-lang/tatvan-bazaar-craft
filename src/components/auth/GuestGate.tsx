import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

/* ===========================================
   GuestGate — shows /login first for anyone
   not authenticated, unless they've chosen
   "Continue as guest" for this browser tab.
   Checkout stays protected separately via
   ProtectedRoute regardless of guest mode.
   New file — wraps the whole app in __root.tsx.
=========================================== */

const GUEST_KEY = "tatvan_guest";

function isGuestSession() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(GUEST_KEY) === "true";
}

export function GuestGate({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [guest, setGuest] = useState(false);

  useEffect(() => {
    setGuest(isGuestSession());
  }, [pathname]);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (loading || isAuthPage) return;
    if (isAuthenticated || guest) return;

    navigate({ to: "/login", search: { redirect: pathname } });
  }, [loading, isAuthenticated, guest, isAuthPage, pathname, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated && !guest && !isAuthPage) {
    return null;
  }

  return <>{children}</>;
}