import mongoose from "mongoose";
import { Currency } from "../utils/utils.ts";

const monthlyDataSchema = new mongoose.Schema(
  {
    month: String,
    revenue: Currency,
    expenses: Currency,
    operationalExpenses: Currency,
    nonOperationalExpenses: Currency,
  },
  { toJSON: { getters: true } }
);

const dailyDataSchema = new mongoose.Schema(
  {
    date: String,
    revenue: Currency,
    expenses: Currency,
  },
  { toJSON: { getters: true } }
);

const kpiSchema = new mongoose.Schema(
  {
    totalProfit: Currency,
    totalRevenue: Currency,
    totalExpenses: Currency,
    expensesByCategory: {
      type: Map,
      of: Currency,
    },
    monthlyData: [monthlyDataSchema],
    dailyData: [dailyDataSchema],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const kpiModel = mongoose.model("kpi", kpiSchema);
export default kpiModel;
