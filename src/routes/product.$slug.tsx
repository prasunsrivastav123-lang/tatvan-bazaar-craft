import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck, Leaf } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { formatINR, getProductBySlug, products } from "@/data/products";
import { useShop } from "@/store/shop-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Tatvan` },
          { name: "description", content: loaderData.product.shortDescription },
          { property: "og:title", content: `${loaderData.product.name} — Tatvan` },
          { property: "og:description", content: loaderData.product.shortDescription },
          { property: "og:type", content: "product" },
        ]
      : [{ title: "Product — Tatvan" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-24 text-center">
        <h1 className="font-display text-4xl text-primary">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
          Back to shop
        </Link>
      </div>
    </SiteLayout>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [weight, setWeight] = useState(product.weightOptions[0]);
  const [qty, setQty] = useState(1);
  const wished = isWishlisted(product.id);
  const related = products.filter((p) => p.id !== product.id);

  return (
    <SiteLayout>
      <div className="container-x pt-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <Link to="/shop/$category" params={{ category: product.category }} className="capitalize hover:text-primary">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <section className="container-x grid gap-12 py-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl text-primary md:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
            <span>· {product.reviewCount} reviews</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl text-primary">{formatINR(product.price)}</span>
            {product.compareAt && (
              <span className="text-lg text-muted-foreground line-through">{formatINR(product.compareAt)}</span>
            )}
            <span className="text-xs text-muted-foreground">incl. of all taxes</span>
          </div>

          <p className="mt-6 text-foreground/80">{product.description}</p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.weightOptions.map((w: string) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    weight === w
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground/80 hover:border-primary",
                  )}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3" aria-label="Decrease">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3" aria-label="Increase">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => {
                addToCart(product.id, weight, qty);
                toast.success(`${product.name} (${weight}) added to cart`);
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95"
            >
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
            <button
              onClick={() => {
                toggleWishlist(product.id);
                toast(wished ? "Removed from wishlist" : "Added to wishlist");
              }}
              aria-label="Wishlist"
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors",
                wished ? "border-destructive text-destructive" : "border-border hover:border-destructive hover:text-destructive",
              )}
            >
              <Heart className={cn("h-5 w-5", wished && "fill-current")} />
            </button>
          </div>

          <ul className="mt-8 grid gap-2">
            {product.benefits.map((b: string) => (
              <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                <Leaf className="h-4 w-4 text-primary" /> {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Free shipping</p>
                <p className="text-xs text-muted-foreground">On orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Lab tested</p>
                <p className="text-xs text-muted-foreground">Every batch verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <h2 className="mb-8 font-display text-3xl text-primary">You may also like</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
