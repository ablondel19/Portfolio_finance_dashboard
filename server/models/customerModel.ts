import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    customerId: String,
    firstName: String,
    lastName: String,
    email: String,
    shippingAdress: String,
    billingAddress: String,
  },
  { timestamps: true, toJSON: { getters: true } }
);

export const Customers = mongoose.model("customers", CustomerSchema);
