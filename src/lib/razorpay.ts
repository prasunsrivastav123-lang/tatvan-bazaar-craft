export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  orderId: string;

  customerName: string;
  email: string;
  phone: string;

  onSuccess: (response: RazorpaySuccessResponse) => Promise<void>;

  onFailure?: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: any) => {
      open(): void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

async function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return;

  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve();

    script.onerror = () => {
      reject(new Error("Failed to load Razorpay Checkout SDK"));
    };

    document.body.appendChild(script);
  });

  return scriptPromise;
}

export async function openRazorpayCheckout(
  options: RazorpayCheckoutOptions
) {
  await loadRazorpayScript();

  const razorpay = new window.Razorpay({
    key: options.key,

    amount: options.amount,

    currency: options.currency,

    order_id: options.orderId,

    name: "Tatvan",

    description: "Organic Products",

    image: "/logo.png",

    prefill: {
      name: options.customerName,
      email: options.email,
      contact: options.phone,
    },

    theme: {
      color: "#1B4332",
    },

    handler: async (response: RazorpaySuccessResponse) => {
      await options.onSuccess(response);
    },

    modal: {
      ondismiss: () => {
        options.onFailure?.();
      },
    },
  });

  razorpay.open();
}