import { renderHook, act } from "@testing-library/react";
import {
  useGetProductsByCategory,
  useGetProductById,
} from "@/modules/products/domain/usecases/getProducts";
import {
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} from "@/modules/products/data/products.api";

jest.mock("@/modules/products/data/products.api", () => ({
  useGetProductsByCategoryQuery: jest.fn(),
  useGetProductByIdQuery: jest.fn(),
}));

describe("useQueryWrapper and related hooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle loading state correctly", () => {
    (useGetProductsByCategoryQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: undefined,
      refetch: jest.fn(),
      data: undefined,
    });

    const { result } = renderHook(() => useGetProductsByCategory("shoes"));
    expect(result.current.wrapperProps.isLoading).toBe(true);
    expect(result.current.wrapperProps.error).toBeUndefined();
  });

  it("should handle API error correctly", () => {
    (useGetProductByIdQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: { data: { message: "Not Found" } },
      refetch: jest.fn(),
      data: undefined,
    });

    const { result } = renderHook(() => useGetProductById("1"));
    expect(result.current.wrapperProps.error).toBe("Not Found");
  });

  it("should call refetch on retry", () => {
    const mockRefetch = jest.fn();

    (useGetProductsByCategoryQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: undefined,
      refetch: mockRefetch,
      data: { products: [], total: 0, limit: 10, skip: 0 },
    });

    const { result } = renderHook(() => useGetProductsByCategory("clothes"));

    act(() => {
      result.current.wrapperProps.onRetry();
    });

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it("should return data correctly", () => {
    (useGetProductsByCategoryQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: undefined,
      refetch: jest.fn(),
      data: {
        products: [{ id: 1, title: "Sneakers" }],
        total: 1,
        limit: 10,
        skip: 0,
      },
    });

    const { result } = renderHook(() => useGetProductsByCategory("shoes"));
    expect(result.current.products).toHaveLength(1);
    expect(result.current.total).toBe(1);
    expect(result.current.limit).toBe(10);
  });
});
