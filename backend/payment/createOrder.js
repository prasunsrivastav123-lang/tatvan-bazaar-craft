import crypto from "crypto";
import razorpay from "./razorpay.js";
import Order from "../models/Order.js";

export async function createOrder(data) {
  const { products, shippingAddress } = data;

  if (!products || products.length === 0) {
    throw new Error("Cart is empty");
  }

  // Calculate subtotal
  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Shipping
  const shipping = subtotal >= 999 ? 0 : 79;

  // Discount (future use)
  const discount = 0;

  const total = subtotal + shipping - discount;

  // Razorpay uses paise
  const amount = total * 100;

  // Unique receipt
  const receipt = `tatvan_${Date.now()}_${crypto
    .randomUUID()
    .slice(0, 8)}`;

  // Create Razorpay Order
  const razorpayOrder = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt,
  });

  // Save Order in MongoDB
  const order = await Order.create({
    customerName: shippingAddress.customerName,
    email: shippingAddress.email,
    phone: shippingAddress.phone,
    address: shippingAddress.address,
    city: shippingAddress.city,
    state: shippingAddress.state,
    postalCode: shippingAddress.postalCode,

    products,

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

    key: process.env.RAZORPAY_KEY_ID,
  };
}