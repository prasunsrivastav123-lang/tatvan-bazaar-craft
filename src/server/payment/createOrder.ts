import { randomUUID } from "crypto";
import { razorpay } from "./razorpay";
import { Order } from "@/models/Order";

export interface CheckoutProduct {
  productId: string;
  slug: string;
  sku?: string;
  name: string;
  weight: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
}

export interface CreateOrderInput {
  products: CheckoutProduct[];
  shippingAddress: ShippingAddress;
}

export async function createOrder(input: CreateOrderInput) {
  if (!input.products.length) {
    throw new Error("Cart is empty.");
  }

  // Calculate subtotal
  const subtotal = input.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // Shipping Logic
  const shipping = subtotal >= 999 ? 0 : 79;

  const discount = 0;

  const total = subtotal + shipping - discount;

  // Razorpay uses paise
  const amount = total * 100;

  const receipt = `tatvan_${Date.now()}_${randomUUID().slice(0, 8)}`;

  const razorpayOrder = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt,
  });

  const order = await Order.create({
    shippingAddress: {
      ...input.shippingAddress,
      country: input.shippingAddress.country || "India",
    },

    products: input.products.map((product) => ({
      productId: product.productId,
      slug: product.slug,
      sku: product.sku,
      name: product.name,
      weight: product.weight,
      price: product.price,
      quantity: product.quantity,
      subtotal: product.price * product.quantity,
    })),

    subtotal,

    shipping,

    discount,

    total,

    currency: "INR",

    paymentStatus: "created",

    shippingStatus: "pending",

    razorpayOrderId: razorpayOrder.id,

    razorpayReceipt: receipt,
  });

return {
  success: true,

  orderId: order._id.toString(),

  razorpayOrderId: razorpayOrder.id,

  amount,

  currency: "INR",

  key: process.env.VITE_RAZORPAY_KEY_ID ?? "",
};
}