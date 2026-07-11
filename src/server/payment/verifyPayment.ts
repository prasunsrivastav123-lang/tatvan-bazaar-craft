import crypto from "crypto";
import { Order } from "@/models/Order";

export interface VerifyPaymentInput {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  paymentMethod?: string;
}

export interface VerifyPaymentResult {
  success: boolean;
  message: string;
}

export async function verifyPayment(
  input: VerifyPaymentInput
): Promise<VerifyPaymentResult> {
  const {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    paymentMethod,
  } = input;

  if (
    !razorpayOrderId ||
    !razorpayPaymentId ||
    !razorpaySignature
  ) {
    throw new Error("Missing payment information.");
  }

  const order = await Order.findOne({
    razorpayOrderId,
  });

  if (!order) {
    throw new Error("Order not found.");
  }

  // Prevent duplicate verification
  if (order.paymentStatus === "paid") {
    return {
      success: true,
      message: "Order already verified.",
    };
  }

  // Generate expected signature
  const generatedSignature = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET as string
    )
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (generatedSignature !== razorpaySignature) {
    order.paymentStatus = "failed";

    await order.save();

    throw new Error("Payment verification failed.");
  }

  order.paymentStatus = "paid";

  order.paymentMethod = paymentMethod;

  order.razorpayPaymentId = razorpayPaymentId;

  order.razorpaySignature = razorpaySignature;

  await order.save();

  return {
    success: true,
    message: "Payment verified successfully.",
  };
}