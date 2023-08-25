import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema(
  {
    sellerId: String,
    sellerName: String,
    sellerLocation: String,
  },
  { timestamps: true, toJSON: { getters: true } }
);

export const Sellers = mongoose.model("sellers", SellerSchema);
