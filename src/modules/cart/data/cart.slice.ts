import { CartItem, CartState } from "@/modules/cart/domain/cart.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (i) => i.product.id === action.payload.product.id
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
        if (existing.quantity <= 0) {
          state.items = state.items.filter(
            (i) => i.product.id !== action.payload.product.id
          );
        }
      } else if (action.payload.quantity > 0) {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
