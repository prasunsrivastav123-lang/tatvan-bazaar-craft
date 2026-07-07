import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/tatvan-logo.png.asset.json";
import { categories } from "@/data/products";
import { useShop } from "@/store/shop-store";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { cartCount, wishlistCount } = useShop();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="border-b border-border/60 bg-primary text-primary-foreground">
        <div className="container-x flex h-9 items-center justify-center text-xs tracking-wide">
          Free shipping across India on orders above ₹999 · Cash on delivery available
        </div>
      </div>
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link to="/" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Tatvan logo" className="h-12 w-12 object-contain" />
          <span className="font-display text-2xl tracking-wide text-primary">Tatvan</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
          <div className="group relative">
            <button className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
              Categories
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-lg border border-border bg-popover p-2 opacity-0 shadow-soft transition-all group-hover:visible group-hover:opacity-100">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/shop/$category"
                  params={{ category: c.slug }}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-secondary"
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="block text-xs text-muted-foreground">{c.tagline}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/wishlist" className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-x flex flex-col py-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-sm font-medium">
                {n.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              <p className="pb-1 text-xs uppercase tracking-wider text-muted-foreground">Shop by category</p>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/shop/$category"
                  params={{ category: c.slug }}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
