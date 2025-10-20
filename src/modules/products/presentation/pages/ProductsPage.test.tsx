import { render, screen } from "@testing-library/react";
import { ProductsPage } from "@/modules/products/presentation/pages/ProductsPage";
import { useProducts } from "@/modules/products/domain/usecases/useProducts";

jest.mock("@/modules/products/domain/usecases/useProducts", () => ({
  useProducts: jest.fn(),
}));

jest.mock("@/modules/products/presentation/components/ProductCard", () => ({
  ProductCard: ({ product }: any) => (
    <div data-testid="product-card">{product.title}</div>
  ),
}));

jest.mock("@/shared/components/Spinner", () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

describe("ProductsPage", () => {
  const mockProducts = [
    { id: 1, title: "Product 1", description: "desc", price: 10 },
    { id: 2, title: "Product 2", description: "desc", price: 20 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it("renders products from the hook", () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      loadMore: jest.fn(),
      isFetching: false,
      error: null,
      hasMore: true,
    });

    render(<ProductsPage />);

    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(2);
    expect(productCards[0]).toHaveTextContent("Product 1");
    expect(productCards[1]).toHaveTextContent("Product 2");
  });

  it("renders error alert when error exists", () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      loadMore: jest.fn(),
      isFetching: false,
      error: { data: { message: "Failed to load products" } },
      hasMore: true,
    });

    render(<ProductsPage />);
    expect(screen.getByText("Failed to load products")).toBeInTheDocument();
  });

  it("renders spinner when fetching", () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      loadMore: jest.fn(),
      isFetching: true,
      error: null,
      hasMore: true,
    });

    render(<ProductsPage />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders 'No more products' when hasMore is false", () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      loadMore: jest.fn(),
      isFetching: false,
      error: null,
      hasMore: false,
    });

    render(<ProductsPage />);
    expect(screen.getByText("No more products")).toBeInTheDocument();
  });

  it("sets up IntersectionObserver correctly", () => {
    const mockObserve = jest.fn();
    const mockDisconnect = jest.fn();

    (global.IntersectionObserver as unknown as jest.Mock).mockImplementation(
      () => ({
        observe: mockObserve,
        unobserve: jest.fn(),
        disconnect: mockDisconnect,
      })
    );

    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      loadMore: jest.fn(),
      isFetching: false,
      error: null,
      hasMore: true,
    });

    render(<ProductsPage />);
    expect(mockObserve).toHaveBeenCalled();
  });
  it("calls loadMore when the loader becomes visible (intersection true)", () => {
    const mockLoadMore = jest.fn();
    const mockObserve = jest.fn();
    let intersectionCallback: (entries: any[]) => void = () => {};

    (global.IntersectionObserver as unknown as jest.Mock).mockImplementation(
      (cb) => {
        intersectionCallback = cb;
        return {
          observe: mockObserve,
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        };
      }
    );

    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      loadMore: mockLoadMore,
      isFetching: false,
      error: null,
      hasMore: true,
    });

    render(<ProductsPage />);

    intersectionCallback([{ isIntersecting: true }]);

    expect(mockLoadMore).toHaveBeenCalledTimes(1);
  });
});
