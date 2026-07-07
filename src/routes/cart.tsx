import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { formatINR } from "@/data/products";
import { useShop } from "@/store/shop-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Tatvan" },
      { name: "description", content: "Review the organic goods in your Tatvan cart." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartWithProducts, subtotal, updateQuantity, removeFromCart } = useShop();
  const shipping = subtotal > 0 && subtotal < 999 ? 79 : 0;
  const total = subtotal + shipping;

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-12">
          <h1 className="font-display text-5xl text-primary">Your Cart</h1>
          <p className="mt-2 text-muted-foreground">{cartWithProducts.length} item(s)</p>
        </div>
      </section>

      {cartWithProducts.length === 0 ? (
        <div className="container-x flex flex-col items-center py-24 text-center">
          <div className="rounded-full bg-secondary p-6 text-primary">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h2 className="mt-6 font-display text-3xl text-primary">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Discover our pure, farm-fresh essentials.</p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Continue shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <section className="container-x grid gap-10 py-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            {cartWithProducts.map((item) => (
              <div key={item.productId + item.weight} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                <Link to="/product/$slug" params={{ slug: item.product.slug }} className="h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link to="/product/$slug" params={{ slug: item.product.slug }} className="font-display text-lg text-foreground hover:text-primary">
                        {item.product.name}
                      </Link>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {item.weight} · {item.product.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.weight)}
                      aria-label="Remove"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button onClick={() => updateQuantity(item.productId, item.weight, item.quantity - 1)} className="p-2" aria-label="Decrease">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.weight, item.quantity + 1)} className="p-2" aria-label="Increase">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-display text-lg text-primary">{formatINR(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-2xl text-primary">Order summary</h3>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-medium">{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
              </div>
              <div className="mt-3 flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-medium">Total</dt>
                <dd className="font-display text-xl text-primary">{formatINR(total)}</dd>
              </div>
            </dl>
            <button className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-95">
              Proceed to checkout
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Checkout will be enabled once payments are connected.
            </p>
            <Link to="/shop" className="mt-4 block text-center text-xs font-medium text-primary hover:underline">
              ← Continue shopping
            </Link>
          </aside>
        </section>
      )}
    </SiteLayout>
  );
}
