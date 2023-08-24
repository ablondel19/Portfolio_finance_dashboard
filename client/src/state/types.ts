import { Dayjs } from "dayjs";

export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

export interface Month {
  id: string;
  _id: string;
  date: string;
  month: string;
  year: string;
  revenue: number;
  expenses: number;
  profit: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
  salaries: number;
  supplies: number;
  marketing: number;
  events: number;
  other: number;
}

export interface FormatConfig {
  data: Array<Month>;
  isLoading: boolean;
  startDate: Dayjs;
  endDate: Dayjs;
  valuesToExtract: Array<string>;
  fieldMappings: {
    [key: string]: string;
  };
}

export interface Day {
  id: string;
  _id: string;
  date: string;
  revenue: number;
  expenses: number;
}

export interface ranges {
  revenue: { min: number; max: number };
  expenses: { min: number; max: number };
  profit: { min: number; max: number };
  opExp: { min: number; max: number };
  nonOpExp: { min: number; max: number };
}

export interface GetKpisResponse {
  id: string;
  _id: string;
  __v: number;
  profit: number;
  revenue: number;
  expenses: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
  monthlyData: Array<Month>;
  dailyData: Array<Day>;
  ranges: ranges;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsResponse {
  id: string;
  _id: string;
  __v: number;
  price: number;
  expense: number;
  transactions: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface GetTransactionsResponse {
  id: string;
  _id: string;
  __v: number;
  buyer: string;
  amount: number;
  productIds: Array<string>;
  createdAt: string;
  updatedAt: string;
}
