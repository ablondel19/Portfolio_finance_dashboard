import { Orders } from "../models/orderModel.ts";
import { Request, Response } from "express";

export const getCategoryList = async (_req: Request, res: Response) => {
  try {
    const orders = await Orders.find().select("items.category items.itemPrice");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
