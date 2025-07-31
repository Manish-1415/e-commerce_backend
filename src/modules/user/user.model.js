import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "seller"],
      lowercase: true,
    },

    refreshToken: {
      type: String,
    },
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
