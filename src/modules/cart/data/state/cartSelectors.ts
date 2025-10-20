import { RootState } from "@/core/store";

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartItems = (state: RootState) => state.cart.items;
