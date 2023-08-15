import mongoose from "mongoose";
import { Currency } from "../utils/utils.ts";

const transactionSchema = new mongoose.Schema(
  {
    buyer: { type: String },
    amount: Currency,
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const transactionModel = mongoose.model("transaction", transactionSchema);
export default transactionModel;
