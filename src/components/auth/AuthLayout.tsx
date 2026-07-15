import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import heroImg from "@/assets/hero-farm.jpg";

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={heroImg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/10" />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="font-display text-2xl tracking-wide">
            Tatvan
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/70">
              Nature · Purity · Tradition
            </p>
            <h2 className="mt-3 max-w-md font-display text-4xl leading-tight">
              Food, the way our grandmothers knew it.
            </h2>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-secondary/20 px-6 py-16">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 block text-center font-display text-2xl text-primary lg:hidden">
            Tatvan
          </Link>
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl text-primary">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}