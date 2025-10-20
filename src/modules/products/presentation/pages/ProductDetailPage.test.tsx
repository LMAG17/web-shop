import { render, screen } from "@testing-library/react";
import { ProductDetailPage } from "@/modules/products/presentation/pages/ProductDetailPage";
import { useParams } from "next/navigation";
import {
  useGetProductById,
  useGetProductsByCategory,
} from "@/modules/products/domain/usecases/getProducts";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/modules/products/domain/usecases/getProducts", () => ({
  useGetProductById: jest.fn(),
  useGetProductsByCategory: jest.fn(),
}));

jest.mock("@/shared/components/DataWrapper", () => ({
  DataWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="data-wrapper">{children}</div>
  ),
}));

jest.mock("@/modules/products/presentation/components/ProductButtons", () => ({
  __esModule: true,
  default: ({ product }: any) => (
    <button data-testid="product-buttons">Add {product.title}</button>
  ),
}));

jest.mock("@/modules/products/presentation/components/ProductCard", () => ({
  ProductCard: ({ product }: any) => (
    <div data-testid="product-card">{product.title}</div>
  ),
}));

describe("ProductDetailPage", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    description: "Description",
    price: 100,
    category: "electronics",
    thumbnail: "/test.jpg",
  };

  const mockSuggestions = [
    { ...mockProduct, id: 2, title: "Suggestion 1" },
    { ...mockProduct, id: 3, title: "Suggestion 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    (useGetProductById as jest.Mock).mockReturnValue({
      product: mockProduct,
      wrapperProps: {},
    });

    (useGetProductsByCategory as jest.Mock).mockReturnValue({
      products: mockSuggestions,
    });
  });

  it("renders product details correctly", () => {
    render(<ProductDetailPage />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText(/Category:/i)).toHaveTextContent("electronics");
    expect(screen.getByTestId("product-buttons")).toBeInTheDocument();
  });

  it("renders related products (suggestions)", () => {
    render(<ProductDetailPage />);

    expect(screen.getByText("You may also like")).toBeInTheDocument();
    const suggestionCards = screen.getAllByTestId("product-card");
    expect(suggestionCards).toHaveLength(2);
    expect(suggestionCards[0]).toHaveTextContent("Suggestion 1");
  });

  it("passes wrapperProps to DataWrapper", () => {
    render(<ProductDetailPage />);
    expect(screen.getByTestId("data-wrapper")).toBeInTheDocument();
  });

  it("handles case with no product gracefully", () => {
    (useGetProductById as jest.Mock).mockReturnValue({
      product: null,
      wrapperProps: {},
    });

    render(<ProductDetailPage />);

    expect(screen.queryByText("You may also like")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Product")).not.toBeInTheDocument();
  });
});
