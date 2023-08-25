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
  createdAt: string;
  updatedAt: string;
  productId: string;
  productName: string;
  price: string;
  quantityAvailable: Number;
  category: string;
  sellerIds: Array<string>;
}

export interface GetCustomersResponse {
  id: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  shippingAdress: string;
  billingAddress: string;
}

export interface Item {
  productId: string;
  quantity: Number;
  itemPrice: string;
  category: string;
}

export interface GetOrdersResponse {
  id: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  customer: string;
  status: string;
  items: Array<Item>;
  totalAmount: string;
  orderDate: string;
}

export interface GetReviewsResponse {
  id: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  reviewId: string;
  customerId: string;
  productId: string;
  rating: Number;
}
export interface GetPaymentsResponse {
  id: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  paymentId: string;
  orderId: string;
  paymentDate: string;
  paymentAmount: string;
  paymentMethod: string;
}

export interface GetSellersResponse {
  id: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  sellerId: string;
  sellerName: string;
  sellerLocation: string;
}

export interface GetCategoriesAndPrices {
  itemPrice: string;
  category: string;
}

export interface getCategoriesAndPricesResponse {
  id: string;
  _id: string;
  __v: number;
  items: Array<GetCategoriesAndPrices>;
}
