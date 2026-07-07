import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";
import { useShop } from "@/store/shop-store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Tatvan" },
      { name: "description", content: "Save your favourite Tatvan organic products for later." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-12">
          <h1 className="font-display text-5xl text-primary">Your Wishlist</h1>
          <p className="mt-2 text-muted-foreground">{items.length} saved item(s)</p>
        </div>
      </section>

      {items.length === 0 ? (
        <div className="container-x flex flex-col items-center py-24 text-center">
          <div className="rounded-full bg-secondary p-6 text-primary">
            <Heart className="h-8 w-8" />
          </div>
          <h2 className="mt-6 font-display text-3xl text-primary">Nothing saved yet</h2>
          <p className="mt-2 text-muted-foreground">Tap the heart on any product to save it here.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Browse products
          </Link>
        </div>
      ) : (
        <section className="container-x py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
