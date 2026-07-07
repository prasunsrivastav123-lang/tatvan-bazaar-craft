import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Sprout, ShieldCheck, Truck } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/data/products";
import heroImg from "@/assets/hero-farm.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/20" />
        </div>
        <div className="container-x relative flex min-h-[560px] flex-col justify-center py-24 text-primary-foreground">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary-foreground/80">
            Nature · Purity · Tradition
          </p>
          <h1 className="max-w-2xl font-display text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
            The taste of the earth, kept whole.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/85">
            Raw honey, hand-churned ghee and stone-ground atta — sourced from small Indian
            farms that still honour the old ways.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]"
            >
              Shop the collection <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/50 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Leaf, title: "100% Organic", text: "No chemicals, ever" },
            { icon: Sprout, title: "Farm Direct", text: "From small Indian farms" },
            { icon: ShieldCheck, title: "Lab Tested", text: "Every batch verified" },
            { icon: Truck, title: "Free Shipping", text: "On orders above ₹999" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="container-x py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Shop by category</p>
            <h2 className="mt-2 font-display text-4xl text-primary">Three staples, done right.</h2>
          </div>
          <Link to="/shop" className="hidden text-sm font-medium text-primary hover:underline md:inline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat) => {
            const product = products.find((p) => p.category === cat.slug);
            return (
              <Link
                key={cat.slug}
                to="/shop/$category"
                params={{ category: cat.slug }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card"
              >
                <div className="aspect-[4/5] overflow-hidden bg-secondary">
                  {product && (
                    <img
                      src={product.image}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/70 to-transparent p-6 text-primary-foreground">
                  <p className="text-xs uppercase tracking-widest text-primary-foreground/80">
                    {cat.tagline}
                  </p>
                  <h3 className="mt-1 font-display text-3xl">{cat.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm">
                    Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container-x pb-20">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Bestsellers</p>
          <h2 className="mt-2 font-display text-4xl text-primary">Loved by our community.</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Story band */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-x grid items-center gap-10 py-20 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/70">Our promise</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Food, the way our grandmothers knew it.
            </h2>
            <p className="mt-5 text-primary-foreground/80">
              Tatvan (तत्त्व) means essence. Every jar we send holds the essence of
              India's small farms — unhurried, honest and untouched by industrial shortcuts.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10"
            >
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {products.map((p) => (
              <img key={p.id} src={p.image} alt={p.name} className="aspect-square w-full rounded-xl object-cover" loading="lazy" />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
