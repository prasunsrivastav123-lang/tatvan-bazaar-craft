import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Organic Honey, Ghee & Atta — Tatvan" },
      { name: "description", content: "Browse Tatvan's collection of raw honey, A2 bilona ghee and stone-ground whole wheat atta." },
      { property: "og:title", content: "Shop — Tatvan" },
      { property: "og:description", content: "Farm-fresh organic goods from small Indian farms." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-14">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Shop</p>
          <h1 className="mt-2 font-display text-5xl text-primary">All products</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            A tiny, considered range. Three staples we make exceptionally well.
          </p>
        </div>
      </section>

      <section className="container-x py-12">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/shop"
            className="rounded-full border border-primary bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/shop/$category"
              params={{ category: c.slug }}
              className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary hover:text-primary"
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
