import mongoose from "mongoose";
import { Currency } from "../utils/utils.ts";

const productSchema = new mongoose.Schema(
  {
    price: Currency,
    expense: Currency,
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const productModel = mongoose.model("product", productSchema);
export default productModel;
