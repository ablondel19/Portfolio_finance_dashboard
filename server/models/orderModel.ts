import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  itemPrice: String,
  category: String,
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: String,
    customer: String,
    status: String,
    items: [ItemSchema],
    totalAmount: String,
    orderDate: String,
  },
  { timestamps: true, toJSON: { getters: true } }
);

export const Orders = mongoose.model("orders", OrderSchema);
