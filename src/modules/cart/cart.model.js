import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },

        quantity: {
          type: Number,
        },

        price: {
          type: Number,
        },
      },
    ],

    totalItems: {
      type: Number,
    },

    totalPrice: {
      type: Number,
    },
  },

  { timestamps: true }
);

export const Cart = model("Cart", cartSchema);
