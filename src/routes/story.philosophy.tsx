import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Sprout, HeartHandshake, Sun, Droplets } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import heroImg from "@/assets/hero-farm.jpg";
import familyImg from "@/assets/story-farmer-family.jpg";
import bilonaImg from "@/assets/story-bilona-ghee.jpg";
import aerialImg from "@/assets/story-farm-aerial.jpg";


export const Route = createFileRoute("/story/philosophy")({
  head: () => ({
    meta: [
      { title: "Our Philosophy — Tatvan" },
      { name: "description", content: "The beliefs that shape every Tatvan jar — slow food, small farms, and the essence of nature." },
      { property: "og:title", content: "Our Philosophy — Tatvan" },
      { property: "og:description", content: "Slow food, small farms, and the essence of nature." },
    ],
  }),
  component: PhilosophyPage,
});

function PhilosophyPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="container-x relative py-20 text-primary-foreground">
          <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/80">Our Story</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">Our Philosophy</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            Tatvan means essence. Everything we do is a return to the simple,
            honest way food was always meant to be made.
          </p>
        </div>
      </section>

      <section className="container-x py-16 md:grid md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="font-display text-4xl text-primary">Return to the essence</h2>
          <p className="mt-4 text-foreground/80">
            We believe food should nourish, not just fill. That every meal begins
            long before it reaches the kitchen — in the soil, the seed, the hands
            that harvest it.
          </p>
          <p className="mt-4 text-foreground/80">
            Tatvan exists to bring you food that hasn't been rushed, refined or
            stripped of its natural character.
          </p>
        </div>
        <div className="mt-8 md:mt-0">
          <img src={familyImg} alt="Partner farmer family in their fields" loading="lazy" width={1024} height={1024} className="h-full w-full rounded-2xl object-cover shadow-card" />
        </div>

      </section>

      <section className="bg-secondary/40">
        <div className="container-x py-16">
          <h2 className="font-display text-4xl text-primary">What we stand for</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { icon: Leaf, title: "Nothing added", text: "No colours, preservatives, or chemicals. Ever." },
              { icon: Sprout, title: "Nothing taken away", text: "Whole ingredients kept in their most natural form." },
              { icon: HeartHandshake, title: "Fair to farmers", text: "Transparent, above-market prices paid directly." },
              { icon: Sun, title: "Slow by design", text: "Traditional methods over industrial shortcuts." },
              { icon: Droplets, title: "Small batches", text: "Because care doesn't scale, only quantity does." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-display text-xl">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        <div className="grid gap-4 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl shadow-card">
            <img src={bilonaImg} alt="Traditional bilona ghee being churned in a clay pot" loading="lazy" width={1024} height={1024} className="h-72 w-full object-cover md:h-96" />
            <figcaption className="bg-card px-5 py-3 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Bilona churning</span> — cultured curd, hand-churned, slow-cooked to golden ghee.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl shadow-card">
            <img src={aerialImg} alt="Terraced organic farm fields at golden hour" loading="lazy" width={1024} height={1024} className="h-72 w-full object-cover md:h-96" />
            <figcaption className="bg-card px-5 py-3 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Chemical-free fields</span> — terraces worked the way they have been for generations.
            </figcaption>
          </figure>
        </div>
      </section>




      <section className="container-x py-16">
        <h2 className="font-display text-4xl text-primary">The way we work</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-4">
          {[
            { n: "01", t: "Meet the farmer", d: "We visit every farm before we ever place an order." },
            { n: "02", t: "Agree on the method", d: "Traditional, chemical-free, and paid fairly." },
            { n: "03", t: "Small-batch harvest", d: "Made only in seasons and quantities that make sense." },
            { n: "04", t: "Test & ship", d: "Independently tested, then packed to your door." },
          ].map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <span className="font-display text-3xl text-primary/60">{s.n}</span>
              <h3 className="mt-2 font-display text-xl">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-x py-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl">A quieter kind of food company.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/80">
            We don't grow fast. We grow honestly — one jar, one farmer, one family at a time.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
