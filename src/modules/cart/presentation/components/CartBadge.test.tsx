import { render, screen } from "@testing-library/react";
import { CartBadge } from "./CartBadge";

jest.mock("@/core/store/hooks", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
}));

jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}));

const { useAppSelector } = jest.requireMock("@/core/store/hooks");

describe("CartBadge", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the cart icon", () => {
    (useAppSelector as jest.Mock).mockReturnValue(0);
    render(<CartBadge />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should not show the badge when count is 0", () => {
    (useAppSelector as jest.Mock).mockReturnValue(0);
    render(<CartBadge />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("should show the badge when count > 0", () => {
    (useAppSelector as jest.Mock).mockReturnValue(3);
    render(<CartBadge />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
