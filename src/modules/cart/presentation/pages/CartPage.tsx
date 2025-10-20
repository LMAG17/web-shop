"use client";

import { Button } from "@/components/ui/button";
import { CartItemComponent } from "@/modules/cart/presentation/components/CartItem";
import { useCart } from "@/modules/cart/presentation/hooks/useCart";

export const CartPage = () => {
  const { items, total, clear } = useCart();

  if (!items.length)
    return <p className="text-center text-gray-500 mt-8">Your cart is empty</p>;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <CartItemComponent key={item.product.id} item={item} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 border-t pt-4">
        <span className="font-semibold text-lg">
          Total: ${total.toFixed(2)}
        </span>
        <Button variant="secondary" onClick={clear}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
};
