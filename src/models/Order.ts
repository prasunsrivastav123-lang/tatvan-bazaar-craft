import { Schema, model, models, type Document, type Model } from "mongoose";

export type PaymentStatus =
  | "created"
  | "authorized"
  | "captured"
  | "paid"
  | "failed"
  | "cancelled"
  | "refunded";

export type ShippingStatus =
  | "pending"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered";

export interface OrderProduct {
  productId: string;
  slug: string;
  sku?: string;
  name: string;
  weight: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface ShippingAddress {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderDocument extends Document {
  shippingAddress: ShippingAddress;

  products: OrderProduct[];

  subtotal: number;
  shipping: number;
  discount: number;
  total: number;

  currency: string;

  couponCode?: string;

  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;

  paymentMethod?: string;

  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  razorpayReceipt?: string;

  transactionId?: string;

  invoiceNumber?: string;

  createdAt: Date;
  updatedAt: Date;
}

const ShippingAddressSchema = new Schema<ShippingAddress>(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    postalCode: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      default: "India",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const OrderProductSchema = new Schema<OrderProduct>(
  {
    productId: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    sku: {
      type: String,
    },

    name: {
      type: String,
      required: true,
    },

    weight: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const OrderSchema = new Schema<OrderDocument>(
  {
    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },

    products: {
      type: [OrderProductSchema],
      required: true,
      validate: [(v: OrderProduct[]) => v.length > 0, "Order must contain at least one product"],
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    shipping: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    couponCode: {
      type: String,
    },

    paymentStatus: {
      type: String,
      enum: [
        "created",
        "authorized",
        "captured",
        "paid",
        "failed",
        "cancelled",
        "refunded",
      ],
      default: "created",
      index: true,
    },

    shippingStatus: {
      type: String,
      enum: [
        "pending",
        "packed",
        "shipped",
        "out_for_delivery",
        "delivered",
      ],
      default: "pending",
      index: true,
    },

    paymentMethod: {
      type: String,
    },

    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    razorpayPaymentId: {
      type: String,
      index: true,
    },

    razorpaySignature: {
      type: String,
    },

    razorpayReceipt: {
      type: String,
    },

    transactionId: {
      type: String,
    },

    invoiceNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({
  createdAt: -1,
});

OrderSchema.index({
  paymentStatus: 1,
  shippingStatus: 1,
});

export const Order: Model<OrderDocument> =
  models.Order || model<OrderDocument>("Order", OrderSchema);