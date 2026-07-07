import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { formatINR, type Product } from "@/data/products";
import { useShop } from "@/store/shop-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const wished = isWishlisted(product.id);

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

        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="font-display text-xl text-primary">{formatINR(product.price)}</span>
            {product.compareAt && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatINR(product.compareAt)}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              addToCart(product.id);
              toast.success(`${product.name} added to cart`);
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
