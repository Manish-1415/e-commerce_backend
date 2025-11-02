import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String, // Cloudinary URL (optional)
    },
    refreshToken: {
      type: String, // optional, will store token later
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // this means if password is not modifying means not changed so it means it is registering first time

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  // what it does is take the password which provided & compare with db stored password
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
