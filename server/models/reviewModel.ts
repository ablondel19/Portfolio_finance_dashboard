import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    reviewId: String,
    customerId: String,
    productId: String,
    rating: Number,
  },
  { timestamps: true, toJSON: { getters: true } }
);

export const Reviews = mongoose.model("reviews", ReviewSchema);
