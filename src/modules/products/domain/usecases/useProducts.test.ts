import { renderHook, act } from "@testing-library/react";
import { useLazyGetProductsQuery } from "@/modules/products/data/products.api";
import { useProducts } from "./useProducts";

jest.mock("@/modules/products/data/products.api", () => ({
  useLazyGetProductsQuery: jest.fn(),
}));

describe("useProducts", () => {
  const mockGetProducts = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useLazyGetProductsQuery as jest.Mock).mockReturnValue([
      mockGetProducts,
      { data: undefined, isFetching: false, isError: false, error: null },
    ]);
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.products).toEqual([]);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.hasMore).toBe(true);
  });

  it("should call getProducts when loadMore is invoked", () => {
    const { result } = renderHook(() => useProducts(10));

    act(() => {
      result.current.loadMore();
    });

    expect(mockGetProducts).toHaveBeenCalledWith({ limit: 10, skip: 0 });
  });

  it("should not call getProducts if fetching or no more data", () => {
    (useLazyGetProductsQuery as jest.Mock).mockReturnValue([
      mockGetProducts,
      { data: undefined, isFetching: true, isError: false, error: null },
    ]);

    const { result } = renderHook(() => useProducts());
    act(() => {
      result.current.loadMore();
    });

    expect(mockGetProducts).not.toHaveBeenCalled();
  });

  it("should update products and pagination when new data arrives", () => {
    const { result, rerender } = renderHook(() => useProducts(2));

    (useLazyGetProductsQuery as jest.Mock).mockReturnValue([
      mockGetProducts,
      {
        data: {
          products: [
            { id: 1, title: "Product 1" },
            { id: 2, title: "Product 2" },
          ],
        },
        isFetching: false,
        isError: false,
        error: null,
      },
    ]);

    rerender();

    expect(result.current.products).toEqual([
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" },
    ]);
    expect(result.current.hasMore).toBe(true);
  });

  it("should set hasMore to false when fewer products than limit are returned", () => {
    const { result, rerender } = renderHook(() => useProducts(3));

    (useLazyGetProductsQuery as jest.Mock).mockReturnValue([
      mockGetProducts,
      {
        data: { products: [{ id: 1, title: "Only One" }] },
        isFetching: false,
        isError: false,
        error: null,
      },
    ]);

    rerender();

    expect(result.current.hasMore).toBe(false);
  });
});
