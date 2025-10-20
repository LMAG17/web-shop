import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "@/modules/products/presentation/components/ProductCard";
import { useCart } from "@/modules/cart/presentation/hooks/useCart";

jest.mock("@/modules/cart/presentation/hooks/useCart", () => ({
  useCart: jest.fn(),
}));

jest.mock("next/link", () => ({ children, href }: any) => (
  <a href={href}>{children}</a>
));

jest.mock("next/image", () => (props: any) => (
  <img {...props} alt={props.alt} />
));

describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 29.99,
    description: "A test product description",
    thumbnail: "/test.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product information correctly", () => {
    (useCart as jest.Mock).mockReturnValue({
      getQuantity: () => 0,
      add: jest.fn(),
      decrease: jest.fn(),
      remove: jest.fn(),
    });

    // @ts-ignore
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("A test product description")).toBeInTheDocument();

    const image = screen.getByRole("img", { name: /test product/i });
    expect(image).toHaveAttribute("src", "/test.jpg");
  });

  it('shows "Add to cart" button when quantity is 0', () => {
    (useCart as jest.Mock).mockReturnValue({
      getQuantity: () => 0,
      add: jest.fn(),
      decrease: jest.fn(),
      remove: jest.fn(),
    });

    // @ts-ignore
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    expect(addButton).toBeInTheDocument();
  });

  it('calls add() when clicking "Add to cart" button', () => {
    const mockAdd = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
      getQuantity: () => 0,
      add: mockAdd,
      decrease: jest.fn(),
      remove: jest.fn(),
    });

    // @ts-ignore
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(addButton);

    expect(mockAdd).toHaveBeenCalledWith(mockProduct);
  });
});
