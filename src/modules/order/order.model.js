import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      //From Auth , payload
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      //From Cart we will fill this
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        quantity: Number,
        price: Number, // Final price (after discount)
      },
    ],

    phoneNo: {
      type: String,
      required: true,
    },

    shippingAddress: {
      //From Frontend we will get this info
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: "India" },
    },

    paymentMethod: {
      //For now only COD
      type: String,
      enum: ["COD", "Card", "UPI", "NetBanking"],
      default: "COD",
    },

    paymentInfo: {
      id: String, // payment gateway transaction ID (like Razorpay/Stripe)
      status: String, // success, failed
    },

    itemsPrice: {
      //Sum of all items that user wants to purchase
      type: Number,
      required: true,
    },

    taxPrice: {
      type: Number,
      default: 0,
    },

    shippingPrice: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    deliveredAt: Date,
    paidAt: Date,
  },

  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
