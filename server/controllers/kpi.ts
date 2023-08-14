import kpiModel from "../models/kpiModel.ts";
import { Request, Response } from "express";

export const getKpis = async (req: Request, res: Response) => {
  try {
    const kpis = await kpiModel.find();
    res.status(200).json(kpis);
  } catch (error) {
    res.status(404).json(error);
  }
};
