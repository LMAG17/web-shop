import {
  Product,
  ProductListResponse,
} from "@/modules/products/domain/product.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductListResponse,
      { limit?: number; skip?: number }
    >({
      query: ({ limit = 8, skip = 0 }) =>
        `/products?limit=${limit}&skip=${skip}`,
    }),
    getProductsByCategory: builder.query<ProductListResponse, string>({
      query: (category) => `/products/category/${category}`,
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
