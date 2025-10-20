import { render, screen } from "@testing-library/react";
import { LoadingScreen } from "@/shared/components/LoadingScreen";

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: any) => (
    <div data-testid="card-content">{children}</div>
  ),
}));

jest.mock("lucide-react", () => ({
  Loader2: () => <svg data-testid="loader-icon" />,
}));

describe("LoadingScreen", () => {
  it("renders default loading message", () => {
    render(<LoadingScreen />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders custom message when provided", () => {
    render(<LoadingScreen message="Fetching products..." />);
    expect(screen.getByText("Fetching products...")).toBeInTheDocument();
  });

  it("renders loader icon and card structure", () => {
    render(<LoadingScreen />);
    expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
  });
});
