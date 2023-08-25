import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetCustomersResponse,
  GetKpisResponse,
  GetOrdersResponse,
  GetPaymentsResponse,
  GetProductsResponse,
  GetReviewsResponse,
  GetSellersResponse,
  getCategoriesAndPricesResponse,
} from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: [
    "Kpis",
    "Products",
    "Customers",
    "Orders",
    "Sellers",
    "Payments",
    "Reviews",
    "Categories",
  ],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis",
      providesTags: ["Kpis"],
    }),

    getCustomers: build.query<Array<GetCustomersResponse>, void>({
      query: () => "sales/customers",
      providesTags: ["Customers"],
    }),

    getOrders: build.query<Array<GetOrdersResponse>, void>({
      query: () => "sales/orders",
      providesTags: ["Orders"],
    }),

    getPayments: build.query<Array<GetPaymentsResponse>, void>({
      query: () => "sales/payments",
      providesTags: ["Payments"],
    }),

    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "products/products",
      providesTags: ["Products"],
    }),

    getReviews: build.query<Array<GetReviewsResponse>, void>({
      query: () => "sales/reviews",
      providesTags: ["Reviews"],
    }),

    getSellers: build.query<Array<GetSellersResponse>, void>({
      query: () => "sales/sellers",
      providesTags: ["Sellers"],
    }),
    // prettier-ignore
    getCategoriesAndPrices: build.query<Array<getCategoriesAndPricesResponse>,void>({
      query: () => "sales/orders/categories",
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetOrdersQuery,
  useGetPaymentsQuery,
  useGetReviewsQuery,
  useGetSellersQuery,
  useGetCategoriesAndPricesQuery,
} = api;
