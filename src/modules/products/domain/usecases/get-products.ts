"use client";

import {
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "@/modules/products/data/products.api";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { skipToken } from "@reduxjs/toolkit/query";
import { useCallback } from "react";

const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
): string | undefined => {
  if (!error) return undefined;
  if ("data" in error && typeof error.data === "object" && error.data) {
    return (
      (error.data as { message?: string })?.message || "Something went wrong"
    );
  }
  if ("message" in error) return error.message;
  return "Unexpected error";
};

const useQueryWrapper = (
  queryResult: ReturnType<
    | typeof useGetProductsQuery
    | typeof useGetProductsByCategoryQuery
    | typeof useGetProductByIdQuery
  >
) => {
  const { error, isLoading, refetch } = queryResult;

  const onRetry = useCallback(() => refetch(), [refetch]);

  return {
    wrapperProps: {
      isLoading,
      error: getErrorMessage(error),
      onRetry,
    },
  };
};

export const useGetProductsByCategory = (category?: string) => {
  const query = useGetProductsByCategoryQuery(category ?? skipToken);
  const { wrapperProps } = useQueryWrapper(query);
  return {
    products: query.data?.products ?? [],
    total: query.data?.total ?? 0,
    limit: query.data?.limit ?? 0,
    skip: query.data?.skip ?? 0,
    wrapperProps,
  };
};

export const useGetProductById = (id?: string) => {
  const query = useGetProductByIdQuery(id ?? skipToken);
  const { wrapperProps } = useQueryWrapper(query);
  return { product: query.data, wrapperProps };
};
