import productModel from "../models/productModel.ts";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error);
  }
};
