import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Sprout, HeartHandshake, Award } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import heroImg from "@/assets/hero-farm.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Tatvan" },
      { name: "description", content: "Tatvan means essence. We work with small Indian farms to bring you raw honey, bilona ghee and stone-ground atta the traditional way." },
      { property: "og:title", content: "Our Story — Tatvan" },
      { property: "og:description", content: "Nature's essence, delivered pure. Meet the farms and traditions behind Tatvan." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="container-x relative py-24 text-primary-foreground">
          <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/80">Our story</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">
            Tatvan means the very essence of things.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85">
            We started Tatvan to bring the quiet, careful food of India's small farms
            back to modern kitchens — nothing added, nothing taken away.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl text-primary">A slower kind of food.</h2>
          <p className="mt-4 text-foreground/80">
            Every ingredient we source is made the old way — honey harvested from wild
            hives, ghee bilona-churned in small batches, wheat milled slowly on stone.
            No shortcuts, no chemicals, no filler.
          </p>
          <p className="mt-4 text-foreground/80">
            We partner directly with farmer families across India and pay them fairly, so
            each jar you buy keeps a tradition — and a livelihood — alive.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Leaf, title: "Chemical Free", text: "Grown & processed without pesticides or additives." },
            { icon: Sprout, title: "Farm Direct", text: "Sourced from small Indian farms we know by name." },
            { icon: HeartHandshake, title: "Fair Trade", text: "Farmers paid transparently, above market." },
            { icon: Award, title: "Lab Verified", text: "Every batch is independently tested for purity." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-display text-xl">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-x grid gap-10 py-16 text-center md:grid-cols-3">
          {[
            { n: "40+", l: "Partner farmer families" },
            { n: "100%", l: "Chemical-free sourcing" },
            { n: "3", l: "Staples, done exceptionally well" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-5xl">{s.n}</p>
              <p className="mt-2 text-primary-foreground/75">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
