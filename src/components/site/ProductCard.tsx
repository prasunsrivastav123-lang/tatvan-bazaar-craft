import { Link } from "@tanstack/react-router";
import { Heart, Star, ChevronDown, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { formatINR, type Product } from "@/data/products";
import { useShop } from "@/store/shop-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const wished = isWishlisted(product.id);
  const [weight, setWeight] = useState(product.weightOptions[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
            toast(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          className={cn(
            "absolute right-3 top-3 rounded-full bg-background/90 p-2 shadow-card transition-colors",
            wished ? "text-destructive" : "text-foreground/70 hover:text-destructive",
          )}
        >
          <Heart className={cn("h-4 w-4", wished && "fill-current")} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
          {product.category}
        </p>
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="mt-1 font-display text-lg leading-tight text-foreground group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span>{product.rating.toFixed(1)}</span>
          <span>· {product.reviewCount} reviews</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="font-display text-xl text-primary">{formatINR(product.price)}</span>
            {product.compareAt && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatINR(product.compareAt)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto pt-4 space-y-2">
          {product.weightOptions.length > 1 ? (
            <div className="relative">
              <select
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                aria-label="Select size"
              >
                {product.weightOptions.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          ) : (
            <div className="rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground">
              {product.weightOptions[0]}
            </div>
          )}

          <div className="flex items-center justify-between rounded-md border border-border bg-background px-2 py-1.5">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="rounded p-1.5 text-foreground/70 hover:bg-secondary hover:text-primary"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold tracking-wide text-foreground">QTY {qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + 1)}
              className="rounded p-1.5 text-foreground/70 hover:bg-secondary hover:text-primary"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              addToCart(product.id, weight, qty);
              setAdded(true);
              toast.success(`${product.name} added to cart`);
            }}
            className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.01]"
          >
            {added ? "Added ✓  Add more" : "Add to cart"}
          </button>

        </div>
      </div>
    </div>
  );
}
