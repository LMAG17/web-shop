import { render, screen, fireEvent } from "@testing-library/react";
import ProductButtons from "@/modules/products/presentation/components/ProductButtons";
import { useCart } from "@/modules/cart/presentation/hooks/useCart";

jest.mock("@/modules/cart/presentation/hooks/useCart");

describe("ProductButtons", () => {
  const mockAdd = jest.fn();
  const mockDecrease = jest.fn();
  const mockRemove = jest.fn();

  const product = {
    id: 1,
    title: "Test Product",
    price: 100,
    thumbnail: "test.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Add to cart button when quantity is 0", () => {
    (useCart as jest.Mock).mockReturnValue({
      add: mockAdd,
      decrease: mockDecrease,
      remove: mockRemove,
      getQuantity: () => 0,
    });
    // @ts-ignore
    render(<ProductButtons product={product} />);

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);
    expect(mockAdd).toHaveBeenCalledWith(product);
  });

  it("renders quantity controls when quantity > 0", () => {
    (useCart as jest.Mock).mockReturnValue({
      add: mockAdd,
      decrease: mockDecrease,
      remove: mockRemove,
      getQuantity: () => 2,
    });
    // @ts-ignore
    render(<ProductButtons product={product} />);

    expect(screen.getByText("2")).toBeInTheDocument();

    const decreaseButton = screen.getByTestId("decrease-button");
    const addButton = screen.getByTestId("add-button");
    const removeButton = screen.getByTestId("remove-button");

    fireEvent.click(addButton);
    expect(mockAdd).toHaveBeenCalledWith(product);

    fireEvent.click(decreaseButton);
    expect(mockDecrease).toHaveBeenCalledWith(product.id);

    fireEvent.click(removeButton);
    expect(mockRemove).toHaveBeenCalledWith(product.id);
  });
});
