import { CartItem, CartState } from "../domain/cart.types";
import cartReducer, {
    addToCart,
    clearCart,
    removeFromCart,
} from "./cart.slice";

describe("cartSlice", () => {
  const mockProduct = (id: number) => ({
    id,
    name: `Product ${id}`,
    price: 100 * id,
  });

  const mockItem = (id: number, quantity = 1): CartItem => ({
    // @ts-ignore
    product: mockProduct(id),
    quantity,
  });

  let initialState: CartState;

  beforeEach(() => {
    initialState = { items: [] };
  });

  it("should return the initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({ items: [] });
  });

  it("should add a new item to the cart", () => {
    const result = cartReducer(initialState, addToCart(mockItem(1)));
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toEqual(mockItem(1));
  });

  it("should increase quantity when adding an existing item", () => {
    const state = { items: [mockItem(1, 2)] };
    const result = cartReducer(state, addToCart(mockItem(1, 3)));
    expect(result.items[0].quantity).toBe(5);
  });

  it("should remove item when quantity becomes 0 or less", () => {
    const state = { items: [mockItem(1, 2)] };
    const result = cartReducer(state, addToCart(mockItem(1, -2)));
    expect(result.items).toHaveLength(0);
  });

  it("should not add item with quantity <= 0 if it doesn’t exist", () => {
    const result = cartReducer(initialState, addToCart(mockItem(1, 0)));
    expect(result.items).toHaveLength(0);
  });

  it("should remove item by product id", () => {
    const state = { items: [mockItem(1), mockItem(2)] };
    const result = cartReducer(state, removeFromCart(1));
    expect(result.items).toHaveLength(1);
    expect(result.items[0].product.id).toBe(2);
  });

  it("should clear the cart", () => {
    const state = { items: [mockItem(1), mockItem(2)] };
    const result = cartReducer(state, clearCart());
    expect(result.items).toHaveLength(0);
  });
});
