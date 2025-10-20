import { useLazyGetProductsQuery } from "@/modules/products/data/products.api";
import { useCallback, useEffect, useState } from "react";
import { Product } from "@/modules/products/domain/product.types";

export const useProducts = (limit = 12) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [getProducts, { data, isFetching, isError, error }] =
    useLazyGetProductsQuery();

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      getProducts({ limit, skip });
    }
  }, [getProducts, limit, skip, hasMore, isFetching]);

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => [...prev, ...data.products]);
      setSkip((prev) => prev + limit);
      setHasMore(data.products.length === limit);
    }
  }, [data, limit]);

  return {
    products,
    loadMore,
    isFetching,
    isError,
    error,
    hasMore,
  };
};
