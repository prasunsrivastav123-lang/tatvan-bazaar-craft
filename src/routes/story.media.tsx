import { createFileRoute } from "@tanstack/react-router";
import { Newspaper, Award, Quote, Tv, Mic } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import heroImg from "@/assets/hero-farm.jpg";
import pressImg from "@/assets/story-press-interview.jpg";
import beekeeperImg from "@/assets/story-beekeeper.jpg";
import stoneMillImg from "@/assets/story-stone-mill.jpg";


export const Route = createFileRoute("/story/media")({
  head: () => ({
    meta: [
      { title: "Media Recognition — Tatvan" },
      { name: "description", content: "Press coverage, awards and mentions for Tatvan's slow, farm-direct pantry staples." },
      { property: "og:title", content: "Media Recognition — Tatvan" },
      { property: "og:description", content: "Where Tatvan has been featured." },
    ],
  }),
  component: MediaPage,
});

const press = ["GQ India", "Hindustan Times", "Krishi Jagran", "myGov", "The Hindu", "Vogue India"];

function MediaPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="container-x relative py-20 text-primary-foreground">
          <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/80">Our Story</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">Media Recognition</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            A quiet brand, gently noticed. Here's some of the press and love that
            has come our way.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <h2 className="font-display text-4xl text-primary">As featured in</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {press.map((p) => (
            <span
              key={p}
              className="rounded-full border border-border bg-secondary/40 px-5 py-2 font-display text-sm text-primary"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="container-x py-16">
          <h2 className="font-display text-4xl text-primary">Recent coverage</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { icon: Newspaper, tag: "The Hindu", t: "The quiet return of the Indian pantry", d: "Feb 2026" },
              { icon: Tv, tag: "NDTV Good Times", t: "Meet the brand bringing bilona ghee back", d: "Nov 2025" },
              { icon: Mic, tag: "Krishi Jagran Podcast", t: "Why fair prices matter more than organic labels", d: "Sep 2025" },
            ].map(({ icon: Icon, tag, t, d }) => (
              <article key={t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <Icon className="h-4 w-4 text-primary" /> {tag} · {d}
                </div>
                <h3 className="mt-3 font-display text-xl text-primary">{t}</h3>
                <button className="mt-4 text-sm font-semibold text-primary hover:underline">Read article →</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <h2 className="font-display text-4xl text-primary">Awards & recognition</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { y: "2025", t: "India Organic Awards", d: "Emerging Brand of the Year" },
            { y: "2024", t: "Slow Food India", d: "Traceability Champion" },
            { y: "2024", t: "FSSAI Eat Right", d: "Featured Small Producer" },
          ].map((a) => (
            <div key={a.t} className="rounded-2xl border border-border bg-card p-6 text-center">
              <Award className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 font-display text-3xl text-primary">{a.y}</p>
              <p className="mt-1 font-semibold">{a.t}</p>
              <p className="text-sm text-muted-foreground">{a.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-x py-16">
          <Quote className="h-8 w-8 text-primary-foreground/70" />
          <blockquote className="mt-4 max-w-3xl font-display text-2xl md:text-3xl leading-snug">
            “Tatvan is doing what most food brands only claim to do — treating
            farmers, ingredients and eaters with the same respect.”
          </blockquote>
          <p className="mt-4 text-sm text-primary-foreground/80">— The Hindu, Feb 2026</p>
        </div>
      </section>

      <section className="container-x py-16 text-center">
        <h2 className="font-display text-3xl text-primary">Press enquiries</h2>
        <p className="mt-2 text-foreground/80">Write to us at <span className="font-semibold">press@tatvan.in</span></p>
      </section>
    </SiteLayout>
  );
}
