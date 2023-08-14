import mongoose from "mongoose";

function toCurrencyValue(value: string) {
  const parsedValue = parseFloat(value.replace("$", "")) * 100;
  return Math.round(parsedValue);
}

function fromCurrencyValue(value: number) {
  return (value / 100).toFixed(2);
}

const Currency = {
  type: Number,
  set: toCurrencyValue,
  get: fromCurrencyValue,
};

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
