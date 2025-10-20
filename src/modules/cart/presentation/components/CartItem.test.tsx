import { render, screen } from "@testing-library/react";
import { CartItemComponent } from "./CartItem";
import { CartItem } from "@/modules/cart/domain/cart.types";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("@/modules/products/presentation/components/ProductButtons", () => ({
  __esModule: true,
  default: ({ product }: { product: any }) => (
    <div data-testid="product-buttons">{product.title} buttons</div>
  ),
}));

describe("CartItemComponent", () => {
  const mockItem: CartItem = {
    // @ts-ignore
    product: {
      id: 1,
      title: "Test Product",
      price: 100,
      thumbnail: "/test-image.jpg",
    },
    quantity: 2,
  };

  it("should render product title and price × quantity", () => {
    render(<CartItemComponent item={mockItem} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$100 × 2")).toBeInTheDocument();
  });

  it("should render product image with correct src and alt", () => {
    render(<CartItemComponent item={mockItem} />);
    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("src", mockItem.product.thumbnail);
    expect(image).toHaveAttribute("alt", mockItem.product.title);
  });

  it("should render ProductButtons with the correct product", () => {
    render(<CartItemComponent item={mockItem} />);
    expect(screen.getByTestId("product-buttons")).toHaveTextContent(
      "Test Product buttons"
    );
  });
});
