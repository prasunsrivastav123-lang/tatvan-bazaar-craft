import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Tatvan" },
      { name: "description", content: "Get in touch with Tatvan for orders, partnerships or wholesale enquiries." },
      { property: "og:title", content: "Contact — Tatvan" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Thanks — we'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
      setSending(false);
    }, 700);
  };

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-14">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Contact</p>
          <h1 className="mt-2 font-display text-5xl text-primary">We'd love to hear from you.</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Whether it's a question about an order, wholesale enquiry or just a hello — write to us.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          {[
            { icon: Mail, title: "Email", value: "hello@tatvan.in" },
            { icon: Phone, title: "Phone", value: "+91 98765 43210" },
            { icon: MapPin, title: "Address", value: "Tatvan Farms, Uttarakhand, India" },
          ].map(({ icon: Icon, title, value }) => (
            <div key={title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
                <p className="mt-1 font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input required name="name" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input required type="email" name="email" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="text-sm font-medium">Subject</span>
            <input name="subject" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium">Message</span>
            <textarea required name="message" rows={5} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </label>
          <button
            disabled={sending}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-70"
          >
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}
