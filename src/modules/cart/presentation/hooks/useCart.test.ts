import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { Product } from "@/modules/products/domain/product.types";
import { act, renderHook } from "@testing-library/react";
import { useCart } from "./useCart";

jest.mock("@/core/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("@/modules/cart/data/cart.slice", () => ({
  addToCart: jest.fn((payload) => ({ type: "addToCart", payload })),
  removeFromCart: jest.fn((payload) => ({ type: "removeFromCart", payload })),
  clearCart: jest.fn(() => ({ type: "clearCart" })),
}));

describe("useCart", () => {
  const dispatch = jest.fn();
  // @ts-ignore
  const mockProduct = (id: number): Product => ({
    id,
    title: `Product ${id}`,
    price: 100 * id,
    thumbnail: `/p${id}.jpg`,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  it("should calculate total correctly", () => {
    (useAppSelector as jest.Mock).mockReturnValue([
      { product: mockProduct(1), quantity: 2 },
      { product: mockProduct(2), quantity: 1 },
    ]);

    const { result } = renderHook(() => useCart());
    expect(result.current.total).toBe(100 * 2 + 200 * 1);
  });

  it("should dispatch addToCart when adding a product", () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.add(mockProduct(1));
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "addToCart",
      payload: { product: mockProduct(1), quantity: 1 },
    });
  });

  it("should decrease quantity when product has more than 1", () => {
    (useAppSelector as jest.Mock).mockReturnValue([
      { product: mockProduct(1), quantity: 2 },
    ]);

    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.decrease(1);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "addToCart",
      payload: { product: mockProduct(1), quantity: -1 },
    });
  });

  it("should remove product when quantity is 1", () => {
    (useAppSelector as jest.Mock).mockReturnValue([
      { product: mockProduct(1), quantity: 1 },
    ]);

    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.decrease(1);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "removeFromCart",
      payload: 1,
    });
  });

  it("should remove product directly", () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.remove(5);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "removeFromCart",
      payload: 5,
    });
  });

  it("should clear the cart", () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.clear();
    });

    expect(dispatch).toHaveBeenCalledWith({ type: "clearCart" });
  });

  it("should return correct quantity for a given product", () => {
    (useAppSelector as jest.Mock).mockReturnValue([
      { product: mockProduct(1), quantity: 3 },
      { product: mockProduct(2), quantity: 1 },
    ]);

    const { result } = renderHook(() => useCart());

    expect(result.current.getQuantity(1)).toBe(3);
    expect(result.current.getQuantity(2)).toBe(1);
    expect(result.current.getQuantity(999)).toBe(0);
  });
});
