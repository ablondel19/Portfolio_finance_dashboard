import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface StatisticsState {
  yearlyRevenueDiff: string;
  yearlyExpensesDiff: string;
}

const initialState: StatisticsState = {
  yearlyRevenueDiff: "",
  yearlyExpensesDiff: "",
};

const calculateTrend = (oldValue: number, newValue: number) => {
  return (((newValue - oldValue) / oldValue) * 100).toFixed(2);
};

export const StatisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    yearlyRevenueTrend: (
      state: StatisticsState,
      action: PayloadAction<{ oldValue: number; newValue: number }>
    ) => {
      state.yearlyRevenueDiff = calculateTrend(
        action.payload.oldValue,
        action.payload.newValue
      );
    },
    yearlyExpensesTrend: (
      state: StatisticsState,
      action: PayloadAction<{ oldValue: number; newValue: number }>
    ) => {
      state.yearlyExpensesDiff = calculateTrend(
        action.payload.oldValue,
        action.payload.newValue
      );
    },
  },
});

export const { yearlyRevenueTrend, yearlyExpensesTrend } =
  StatisticsSlice.actions;
export default StatisticsSlice.reducer;
