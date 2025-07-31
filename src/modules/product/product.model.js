import { required } from "joi";
import mongoose from "mongoose";
import { User } from "../user/user.model";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    mrp: {
      type: Number,
    },

    stock: {
      type: Number,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    ratings: {
      type: Number,
    },

    numOfReviews: {
      type: Number,
    },

    reviews: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: User,
        },
        name: String,
        rating: Number,
        comment: String,
      },
    ],
  },

  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
