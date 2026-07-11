import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Sprout, ShieldCheck, Truck, Gift, CloudRain, PackageOpen, Boxes, BadgeIndianRupee, Droplet, Milk, Wheat, Play, Star } from "lucide-react";

const categoryIcons: Record<string, typeof Droplet> = {
  honey: Droplet,
  ghee: Milk,
  atta: Wheat,
};
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/data/products";
import heroImg from "@/assets/hero-farm.jpg";
import promoMonsoonImg from "@/assets/promo-monsoon-lifestyle.jpg";
import promoPriceDropImg from "@/assets/promo-price-drop.jpg";
import promoDiscountsImg from "@/assets/promo-discounts.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const quickLinks = [
  { icon: Gift, label: "Membership Deals", to: "/shop", tone: "brown" },
  { icon: CloudRain, label: "Monsoon Special", to: "/shop", tone: "green" },
  { icon: PackageOpen, label: "New Launches", to: "/shop", tone: "green" },
  { icon: Boxes, label: "All Products", to: "/shop", tone: "green" },
  { icon: BadgeIndianRupee, label: "Under ₹999", to: "/shop", tone: "brown" },
] as const;

function HomePage() {
  return (
    <SiteLayout>
      {/* Quick category stickers */}
      <section className="border-b border-border bg-secondary/30">
        <div className="container-x py-8">
          <ul className="flex flex-wrap items-start justify-center gap-6 sm:gap-10">
            {quickLinks.map(({ icon: Icon, label, to, tone }) => (
              <li key={label} className="flex w-24 flex-col items-center gap-3 text-center">
                <Link
                  to={to}
                  aria-label={label}
                  className={`flex h-20 w-20 items-center justify-center rounded-full shadow-soft transition-transform hover:scale-105 ${
                    tone === "brown"
                      ? "bg-[hsl(25_55%_20%)] text-[hsl(45_70%_75%)]"
                      : "bg-primary text-[hsl(45_70%_75%)]"
                  }`}
                >
                  <Icon className="h-9 w-9" strokeWidth={1.6} />
                </Link>
                <span className="text-xs font-semibold tracking-wide text-primary">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.slug] ?? Leaf;
            return (
              <Link
                key={cat.slug}
                to="/shop/$category"
                params={{ category: cat.slug }}
                className="group flex flex-col items-center gap-4 rounded-2xl p-6 text-center transition-colors hover:bg-secondary/60"
              >
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-primary/15 bg-background text-primary transition-transform group-hover:scale-105 sm:h-36 sm:w-36">
                  <Icon className="h-14 w-14 sm:h-16 sm:w-16" strokeWidth={1.4} />
                </div>
                <div>
                  <h3 className="font-display text-xl text-primary sm:text-2xl">{cat.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{cat.tagline}</p>
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

      {/* It Takes A Village — story reels */}
      <section className="bg-[hsl(60_45%_90%)]">
        <div className="container-x py-20">
          <h2 className="text-center font-display text-3xl text-primary sm:text-4xl md:text-5xl">
            It Takes A Village To Make Good Food — Come Take A Peek!
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { title: "Meet Our Beekeepers", product: products[0], tag: "Behind the Honey" },
              { title: "Making of A2 Bilona Ghee", product: products[1], tag: "Farm Story" },
              { title: "Stone-Chakki Atta, Slow & Fresh", product: products[2], tag: "Millers at Work" },
              { title: "859+ of you asked for it", product: products[0], tag: "Loved by all" },
              { title: "From our farm to your kitchen", product: products[1], tag: "Journey" },
            ].map((v, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl bg-background shadow-card">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={v.product.image} alt={v.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                    {v.tag}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/85 text-primary shadow-soft transition-transform group-hover:scale-110">
                      <Play className="h-6 w-6 fill-current" />
                    </div>
                  </div>
                  <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold leading-tight text-primary-foreground">
                    {v.title}
                  </p>
                </div>
                <Link
                  to="/product/$slug"
                  params={{ slug: v.product.slug }}
                  className="flex items-center gap-3 border-t border-border p-3"
                >
                  <img src={v.product.image} alt="" className="h-11 w-11 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-primary">{v.product.name}</p>
                    <p className="text-xs text-muted-foreground">₹ {v.product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
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

      {/* Press + Reviews */}
      <section className="bg-[hsl(30_50%_96%)]">
        <div className="container-x py-16 sm:py-20">
          {/* Press bar */}
          <div className="rounded-2xl bg-[hsl(30_15%_92%)] px-6 py-6 sm:py-8">
            <div className="grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-5">
              {[
                { name: "GQ", cls: "font-display text-3xl font-black tracking-tighter" },
                { name: "Hindustan Times", cls: "font-display text-lg font-semibold italic" },
                { name: "KRISHI JAGRAN", cls: "font-display text-base font-black tracking-tight" },
                { name: "myGov", cls: "font-display text-xl font-black lowercase tracking-tight" },
                { name: "THE HINDU", cls: "font-display text-lg font-semibold tracking-widest" },
              ].map((p) => (
                <div key={p.name} className={`text-foreground/80 ${p.cls}`}>
                  {p.name}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              {
                name: "NITHIN KAMATH",
                role: "Founder, Rainmatter",
                initials: "NK",
                quote:
                  "At Tatvan, we care deeply about what we eat. Their farms stood out — clean food, deep purpose, and a clear mission to support farmer livelihoods. We're customers first.",
              },
              {
                name: "ANAND S AHUJA",
                role: "Founder, Bhaane",
                initials: "AA",
                quote:
                  "Pure love, pure taste, pure intention. Every product from Tatvan feels authentic and full of heart — from how it's grown to how it tastes. It inspires mindful eating.",
              },
              {
                name: "MIRA KAPOOR",
                role: "India",
                initials: "MK",
                quote:
                  "One of the few brands that makes ghee the traditional way — from dahi, not malai. That alone won me over. Delicious, wholesome, and always a repeat buy.",
              },
            ].map((r) => (
              <figure key={r.name} className="relative">
                {/* Top row: stars + name (left) · avatar (right) */}
                <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-1">
                  <div className="min-w-0">
                    <div className="mb-2 flex gap-0.5 text-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
                      ))}
                    </div>
                    <p className="truncate text-sm font-bold tracking-wide text-primary">{r.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.role}</p>
                  </div>
                  <div
                    aria-hidden
                    className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary text-primary shadow-soft ring-4 ring-[hsl(30_50%_96%)]"
                  >
                    <span className="font-display text-lg font-bold">{r.initials}</span>
                  </div>
                </div>
                {/* Quote card */}
                <blockquote className="-mt-6 rounded-2xl bg-[hsl(28_85%_72%)] p-6 pt-10 text-primary-foreground shadow-card">
                  <p className="text-sm font-semibold leading-relaxed">{r.quote}</p>
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}
