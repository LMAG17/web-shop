import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import { Product } from "@/modules/products/domain/product.types";
import { useCart } from "@/modules/cart/presentation/hooks/useCart";

type Props = {
  product: Product;
};

export default function ProductButtons({ product }: Props) {
  const { add, decrease, remove, getQuantity } = useCart();
  const quantity = getQuantity(product?.id ?? 0);

  return quantity === 0 ? (
    <Button
      className="mt-2 w-full"
      onClick={() => add(product)}
      variant="default"
    >
      Add to cart
    </Button>
  ) : (
    <div className="mt-2 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => decrease(product.id)}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="text-sm font-semibold w-8 text-center">
          {quantity}
        </span>

        <Button size="icon" variant="outline" onClick={() => add(product)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button
        size="icon"
        variant="destructive"
        onClick={() => remove(product.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
