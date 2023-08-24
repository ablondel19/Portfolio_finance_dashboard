import mongoose from "mongoose";
import { Currency } from "../utils/utils.ts";

const monthlyDataSchema = new mongoose.Schema(
  {
    month: String,
    date: String,
    revenue: Currency,
    profit: Currency,
    expenses: Currency,
    operationalExpenses: Currency,
    nonOperationalExpenses: Currency,
    salaries: Currency,
    supplies: Currency,
    marketing: Currency,
    events: Currency,
    other: Currency,
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
    profit: Currency,
    revenue: Currency,
    expenses: Currency,
    operationalExpenses: Currency,
    nonOperationalExpenses: Currency,
    monthlyData: [monthlyDataSchema],
    dailyData: [dailyDataSchema],
    ranges: {
      revenue: { min: Number, max: Number },
      expenses: { min: Number, max: Number },
      profit: { min: Number, max: Number },
      opExp: { min: Number, max: Number },
      nonOpExp: { min: Number, max: Number },
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

const kpiModel = mongoose.model("kpi", kpiSchema);
export default kpiModel;
