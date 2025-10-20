import { selectCartCount, selectCartItems } from "./cartSelectors";
import { RootState } from "@/core/store";

describe("cart selectors", () => {
  const mockState: RootState = {
    cart: {
      items: [
        { product: { id: 1, title: "Product A" }, quantity: 2 },
        { product: { id: 2, title: "Product B" }, quantity: 3 },
      ],
    },
  } as unknown as RootState;

  it("selectCartCount should return total quantity of all items", () => {
    const result = selectCartCount(mockState);
    expect(result).toBe(5);
  });

  it("selectCartCount should return 0 when cart is empty", () => {
    const emptyState = { ...mockState, cart: { items: [] } };
    // @ts-ignore
    const result = selectCartCount(emptyState);
    expect(result).toBe(0);
  });

  it("selectCartItems should return the array of cart items", () => {
    const result = selectCartItems(mockState);
    expect(result).toEqual(mockState.cart.items);
  });
});
