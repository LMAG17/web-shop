"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/modules/products/domain/product.types";
import ProductButtons from "@/modules/products/presentation/components/ProductButtons";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="hover:shadow-md transition p-2 flex flex-col justify-between">
      <Link href={`/products/${product.id}`}>
        <CardHeader>
          <CardTitle className="text-md font-semibold">
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={200}
            height={200}
            className="rounded-md object-cover mb-2"
          />
          <div className="flex flex-col gap-2">
            <p className="text-gray-600 text-sm">${product.price}</p>
            <p className="text-gray-800 text-sm">{product.description}</p>
          </div>
        </CardContent>
      </Link>

      <ProductButtons product={product} />
    </Card>
  );
};
