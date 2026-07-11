import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    postalCode: {
      type: String,
      required: true,
    },

    products: [
      {
        productId: String,
        slug: String,
        sku: String,
        name: String,
        weight: String,
        quantity: Number,
        price: Number,
      },
    ],

    subtotal: Number,
    shipping: Number,
    discount: Number,
    total: Number,

    currency: {
      type: String,
      default: "INR",
    },

    paymentStatus: {
      type: String,
      default: "created",
    },

    shippingStatus: {
      type: String,
      default: "pending",
    },

    razorpayOrderId: {
      type: String,
      unique: true,
    },

    razorpayPaymentId: String,
    razorpaySignature: String,
    razorpayReceipt: String,
  },
  {
    timestamps: true,
  }
);

const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;