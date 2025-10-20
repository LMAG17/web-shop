"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Product } from "@/modules/products/domain/product.types";
import { useProducts } from "@/modules/products/domain/usecases/useProducts";
import { Spinner } from "@/shared/components/Spinner";
import { useEffect, useRef } from "react";
import { ProductCard } from "@/modules/products/presentation/components/ProductCard";

export const ProductsPage = () => {
  const { products, loadMore, isFetching, error, hasMore } = useProducts(30);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore, hasMore, isFetching]);

  return (
    <div className="p-4">
      {!!error && (
        <Alert variant="destructive">
          <AlertDescription>
            {error ? (error as any).data?.message : "Error loading products"}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p: Product) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div ref={loaderRef} className="flex justify-center py-6">
        {isFetching && <Spinner />}
        {!hasMore && (
          <p className="text-sm text-muted-foreground">No more products</p>
        )}
      </div>
    </div>
  );
};
