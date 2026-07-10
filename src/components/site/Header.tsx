import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X, ChevronDown, Droplet, Milk, Wheat } from "lucide-react";
import { useState } from "react";
import logoUrl from "@/assets/tatvan-logo.png";
import { categories } from "@/data/products";
import { useShop } from "@/store/shop-store";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/contact", label: "Contact" },
] as const;

const storyLinks = [
  { to: "/about", label: "Our Story", tagline: "Where Tatvan began" },
  { to: "/story/philosophy", label: "Our Philosophy", tagline: "What we believe in" },
  { to: "/story/traceability", label: "Traceability", tagline: "Farm to jar" },
  { to: "/story/media", label: "Media Recognition", tagline: "Press & awards" },
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
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="border-b border-border/60 bg-primary text-primary-foreground">
        <div className="container-x flex h-9 items-center justify-center text-center text-[11px] tracking-wide sm:text-xs">
          Free shipping across India on orders above ₹999 · COD available
        </div>
      </div>
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img src={logoUrl} alt="Tatvan logo" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
          <span className="font-display text-xl tracking-wide text-primary sm:text-2xl">Tatvan</span>
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
                <div className="absolute left-1/2 top-full h-3 w-full -translate-x-1/2" />
                <div className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-2xl border border-border bg-popover p-3 shadow-soft">
                  <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-border bg-popover" />
                  <ul className="flex items-stretch divide-x divide-border">
                    {categories.map((c) => {
                      const Icon = categoryIcons[c.slug] ?? Droplet;
                      return (
                        <li key={c.slug}>
                          <Link
                            to="/shop/$category"
                            params={{ category: c.slug }}
                            onClick={() => setCatOpen(false)}
                            className="group flex w-36 flex-col items-center gap-2 px-4 py-2 text-center transition-colors hover:bg-secondary/50 rounded-lg"
                          >
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/15 bg-secondary/40 text-primary transition-transform group-hover:scale-105">
                              <Icon className="h-7 w-7" strokeWidth={1.6} />
                            </div>
                            <span className="text-sm font-semibold text-primary">{c.name}</span>
                            <span className="text-[11px] leading-tight text-muted-foreground">{c.tagline}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen((v) => !v)}>
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
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

      {searchOpen && (
        <div className="border-t border-border bg-background">
          <div className="container-x flex items-center gap-2 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              type="search"
              placeholder="Search for honey, ghee, atta…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs font-medium text-muted-foreground hover:text-primary"
              aria-label="Close search"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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
              <ul className="divide-y divide-border rounded-xl border border-border">
                {categories.map((c) => {
                  const Icon = categoryIcons[c.slug] ?? Droplet;
                  return (
                    <li key={c.slug}>
                      <Link
                        to="/shop/$category"
                        params={{ category: c.slug }}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 p-3"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                          <Icon className="h-5 w-5" strokeWidth={1.6} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-primary">{c.name}</span>
                          <span className="text-[11px] text-muted-foreground">{c.tagline}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
