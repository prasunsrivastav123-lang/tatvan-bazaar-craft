import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

import { openRazorpayCheckout } from "@/lib/razorpay";

import { useShop } from "@/store/shop-store";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {

const { cartWithProducts } = useShop();
const { user } = useAuth();

const [loading, setLoading] = useState(false);

const [form, setForm] = useState({
  customerName: user?.name ?? "",
  email: user?.email ?? "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
});
const handlePayment = async () => {
  const API = import.meta.env.VITE_API_URL;
  if (
  !form.customerName ||
  !form.email ||
  !form.phone ||
  !form.address ||
  !form.city ||
  !form.state ||
  !form.postalCode
) {
  alert("Please fill all the shipping details.");
  return;
}
  try {
    setLoading(true);

   const response = await fetch(`${API}/payment/create-order`,{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    products: cartWithProducts.map((item) => ({
      productId: item.productId,
      slug: item.product.slug,
      sku: "",
      name: item.product.name,
      weight: item.weight,
      quantity: item.quantity,
      price: item.product.price,
    })),
    shippingAddress: {
      ...form,
      country: "India",
    },
  }),
});

const order = await response.json();;

await openRazorpayCheckout({
  key: order.key,
  amount: order.amount,
  currency: order.currency,
  orderId: order.razorpayOrderId,

  customerName: form.customerName,
  email: form.email,
  phone: form.phone,

  async onSuccess(response) {
    try {
  await fetch(`${API}/payment/verify`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    razorpayOrderId: response.razorpay_order_id,
    razorpayPaymentId: response.razorpay_payment_id,
    razorpaySignature: response.razorpay_signature,
  }),
});;

      window.location.href = "/order-success";
    } finally {
      setLoading(false);
    }
  },

  onFailure() {
    setLoading(false);
    alert("Payment Cancelled");
  },
});
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};
  return (
    <ProtectedRoute>
      <SiteLayout>
        <section className="container-x py-16">
          <h1 className="font-display text-4xl text-primary">
            Checkout
          </h1>

          <p className="mt-2 text-muted-foreground">
            Complete your shipping information.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-xl border border-border p-6">
              <h2 className="font-semibold text-xl">
                Shipping Information
              </h2>

              <div className="mt-6 space-y-4">
  <input
    value={form.customerName}
    onChange={(e) =>
      setForm({
        ...form,
        customerName: e.target.value,
      })
    }
    placeholder="Full Name"
    className="w-full rounded-lg border p-3"
  />
  <input
    value={form.email}
    onChange={(e) =>
      setForm({
        ...form,
        email: e.target.value,
      })
    }
    placeholder="Email"
    className="w-full rounded-lg border p-3"
  />

                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Phone"
                  className="w-full rounded-lg border p-3"
                />

                <textarea
                  placeholder="Address"
                  className="w-full rounded-lg border p-3"
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={form.city}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        city: e.target.value,
                      })
                    }
                    placeholder="City"
                    className="rounded-lg border p-3"
                  />

                  <input
                    value={form.state}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        state: e.target.value,
                      })
                    }
                    placeholder="State"
                    className="rounded-lg border p-3"
                  />
                </div>

                <input
                  value={form.postalCode}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      postalCode: e.target.value,
                    })
                  }
                  placeholder="PIN Code"
                  className="w-full rounded-lg border p-3"
                />
              </div>
            </div>

            <div className="rounded-xl border border-border p-6">
              <h2 className="font-semibold text-xl">
                Order Summary
              </h2>

            <div className="space-y-3">
    {cartWithProducts.map((item) => (
      <div
        key={item.productId + item.weight}
        className="flex justify-between"
      >
        <span>
          {item.product.name} × {item.quantity}
        </span>

        <span>
          ₹{item.product.price * item.quantity}
        </span>
      </div>
    ))}
  </div>
             <button
    onClick={handlePayment}
    disabled={loading}
    className="mt-8 w-full rounded-full bg-primary py-3 text-white"
  >
    {loading ? "Creating Order..." : "Pay Now"}
  </button>
            </div>
          </div>
        </section>
      </SiteLayout>
    </ProtectedRoute>
  );
}