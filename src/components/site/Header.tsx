import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X, ChevronDown, Droplet, Milk, Wheat } from "lucide-react";
import { useState } from "react";
import logoUrl from "@/assets/tatvan-logo.png";
import { categories } from "@/data/products";
import { useShop } from "@/store/shop-store";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Contact" },
] as const;


const categoryIcons: Record<string, typeof Droplet> = {
  honey: Droplet,
  ghee: Milk,
  atta: Wheat,
};

export function Header() {
  const { cartCount, wishlistCount } = useShop();
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

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
          <img src={logoUrl} alt="Tatvan logo" className="h-12 w-12 object-contain" />
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
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              onClick={() => setCatOpen((v) => !v)}
              aria-expanded={catOpen}
            >
              Shop by Category
              <ChevronDown className={`h-4 w-4 transition-transform ${catOpen ? "rotate-180" : ""}`} />
            </button>

            {catOpen && (
              <>
                {/* invisible bridge so hover doesn't drop */}
                <div className="absolute left-1/2 top-full h-3 w-full -translate-x-1/2" />
                <div className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-2xl border border-border bg-popover p-6 shadow-soft">
                  {/* arrow */}
                  <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-border bg-popover" />
                  <div className="grid grid-cols-3 gap-6">
                    {categories.map((c) => {
                      const Icon = categoryIcons[c.slug] ?? Droplet;
                      return (
                        <Link
                          key={c.slug}
                          to="/shop/$category"
                          params={{ category: c.slug }}
                          onClick={() => setCatOpen(false)}
                          className="group flex w-24 flex-col items-center gap-2 text-center"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/15 bg-secondary/40 text-primary transition-transform group-hover:scale-105">
                            <Icon className="h-8 w-8" strokeWidth={1.6} />
                          </div>
                          <span className="text-sm font-semibold text-primary">{c.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
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
            <div className="mt-2 border-t border-border pt-3">
              <p className="pb-2 text-xs uppercase tracking-wider text-muted-foreground">Shop by Category</p>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((c) => {
                  const Icon = categoryIcons[c.slug] ?? Droplet;
                  return (
                    <Link
                      key={c.slug}
                      to="/shop/$category"
                      params={{ category: c.slug }}
                      onClick={() => setOpen(false)}
                      className="flex flex-col items-center gap-2 rounded-xl border border-border p-3 text-center"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                        <Icon className="h-6 w-6" strokeWidth={1.6} />
                      </div>
                      <span className="text-xs font-semibold text-primary">{c.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
