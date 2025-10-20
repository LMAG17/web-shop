"use client";

import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import {
  addToCart,
  clearCart,
  removeFromCart,
} from "@/modules/cart/data/cart.slice";
import { selectCartItems } from "@/modules/cart/data/state/cartSelectors";
import { Product } from "@/modules/products/domain/product.types";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const add = (product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const decrease = (productId: number) => {
    const existing = items.find((i) => i.product.id === productId);
    if (existing) {
      if (existing.quantity > 1) {
        dispatch(addToCart({ ...existing, quantity: -1 }));
      } else {
        dispatch(removeFromCart(productId));
      }
    }
  };

  const remove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const getQuantity = (productId: number) => {
    return items.find((i) => i.product.id === productId)?.quantity || 0;
  };

  const clear = () => {
    dispatch(clearCart());
  };

  return { add, decrease, remove, getQuantity, clear, items, total };
};
