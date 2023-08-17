import transactionModel from "../models/transactionModel.ts";
import { Request, Response } from "express";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await transactionModel
      .find()
      .limit(50)
      .sort({ createdOn: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json(error);
  }
};
