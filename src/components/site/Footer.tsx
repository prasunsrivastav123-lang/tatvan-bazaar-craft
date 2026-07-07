import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Leaf } from "lucide-react";
import logoAsset from "@/assets/tatvan-logo.png.asset.json";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Tatvan" className="h-12 w-12" />
            <span className="font-display text-2xl">Tatvan</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Nature's essence, delivered pure. Farm-fresh organic goods sourced from small Indian farms.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full border border-primary-foreground/30 p-2 hover:bg-primary-foreground/10">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="rounded-full border border-primary-foreground/30 p-2 hover:bg-primary-foreground/10">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="rounded-full border border-primary-foreground/30 p-2 hover:bg-primary-foreground/10">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/shop" className="hover:text-primary-foreground">All Products</Link></li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/shop/$category" params={{ category: c.slug }} className="hover:text-primary-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-primary-foreground">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-primary-foreground">Contact</Link></li>
            <li><a href="#" className="hover:text-primary-foreground">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-primary-foreground">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg">Stay in touch</h4>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Recipes, farm stories & first access to new harvests.
          </p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="w-full rounded-md border border-primary-foreground/30 bg-transparent px-3 py-2 text-sm placeholder:text-primary-foreground/50 focus:border-primary-foreground focus:outline-none"
            />
            <button className="rounded-md bg-primary-foreground px-4 text-sm font-medium text-primary hover:bg-primary-foreground/90">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-primary-foreground/60 md:flex-row">
          <p className="flex items-center gap-2"><Leaf className="h-3.5 w-3.5" /> © {new Date().getFullYear()} Tatvan. Made with care in India.</p>
          <p>Certified Organic · Chemical Free · Ethically Sourced</p>
        </div>
      </div>
    </footer>
  );
}
