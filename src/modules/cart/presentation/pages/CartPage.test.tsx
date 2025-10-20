import { render, screen, fireEvent } from "@testing-library/react";
import { CartPage } from "@/modules/cart/presentation/pages/CartPage";

jest.mock("@/modules/cart/presentation/hooks/useCart", () => ({
  useCart: jest.fn(),
}));

import { useCart } from "@/modules/cart/presentation/hooks/useCart";

describe("CartPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty cart message when no items", () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [],
      total: 0,
      clear: jest.fn(),
      getQuantity: jest.fn(),
    });

    render(<CartPage />);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("renders cart items and total", () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [
        {
          product: {
            id: 1,
            title: "Test Product",
            price: 10,
            thumbnail: "https://test.jpg",
          },
          quantity: 2,
        },
      ],
      total: 20,
      clear: jest.fn(),
      getQuantity: jest.fn(),
    });

    render(<CartPage />);

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText(/test product/i)).toBeInTheDocument();
    expect(screen.getByText(/total: \$20.00/i)).toBeInTheDocument();
  });

  it("calls clear when clicking 'Clear Cart'", () => {
    const mockClear = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      items: [
        {
          product: {
            id: 1,
            title: "Product 1",
            price: 5,
            thumbnail: "https://img.jpg",
          },
          quantity: 1,
        },
      ],
      total: 5,
      clear: mockClear,
      getQuantity: jest.fn(),
    });

    render(<CartPage />);

    const button = screen.getByRole("button", { name: /clear cart/i });
    fireEvent.click(button);

    expect(mockClear).toHaveBeenCalledTimes(1);
  });
});
