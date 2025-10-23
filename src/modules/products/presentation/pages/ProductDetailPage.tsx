"use client";

import { DataWrapper } from "@/shared/components/DataWrapper";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  useGetProductById,
  useGetProductsByCategory,
} from "@/modules/products/domain/usecases/getProducts";
import { ProductCard } from "@/modules/products/presentation/components/ProductCard";
import ProductButtons from "@/modules/products/presentation/components/ProductButtons";

export const ProductDetailPage = () => {
  const params = useParams();
  const productId = String(params.id);

  const { product, wrapperProps } = useGetProductById(productId);
  const { products } = useGetProductsByCategory(product?.category);

  const suggestions = products.filter((p) => p.id !== product?.id).slice(0, 4);

  return (
    <DataWrapper {...wrapperProps}>
      <div className="max-w-4xl mx-auto mt-8 space-y-6">
        {!!product && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <Image
                src={product?.thumbnail}
                alt={product?.title}
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>

            <div className="md:w-1/2 flex flex-col gap-4">
              <h1 className="text-2xl font-bold">{product?.title}</h1>
              <p className="text-gray-700">{product?.description}</p>
              <p className="text-xl font-semibold">${product?.price}</p>
              <p className="text-sm text-gray-500" data-testid="category-label">
                Category: {product?.category}
              </p>
              <ProductButtons product={product} />
            </div>
          </div>
        )}

        {!!product && suggestions.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {suggestions.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DataWrapper>
  );
};
