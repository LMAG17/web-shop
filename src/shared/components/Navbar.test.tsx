import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/modules/cart/presentation/components/CartBadge", () => ({
  CartBadge: () => <div data-testid="cart-badge">CartBadge</div>,
}));

describe("Navbar", () => {
  it("renders the brand name with correct link", () => {
    render(<Navbar />);
    const brand = screen.getByRole("link", { name: /nextcommerce/i });
    expect(brand).toBeInTheDocument();
    expect(brand).toHaveAttribute("href", "/");
  });

  it("renders the CartBadge component", () => {
    render(<Navbar />);
    expect(screen.getByTestId("cart-badge")).toBeInTheDocument();
  });

  it("has the correct container structure and classes", () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("bg-white", "shadow-sm", "sticky", "top-0", "z-50");
  });
});
