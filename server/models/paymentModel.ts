import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    paymentId: String,
    orderId: String,
    paymentDate: String,
    paymentAmount: String,
    paymentMethod: String,
  },
  { timestamps: true, toJSON: { getters: true } }
);

export const Payments = mongoose.model("payments", PaymentSchema);
