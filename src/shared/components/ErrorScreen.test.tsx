import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorScreen } from "@/shared/components/ErrorScreen";

jest.mock("@/components/ui/button", () => ({
  Button: ({ onClick, children }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: any) => (
    <div data-testid="card-content">{children}</div>
  ),
}));

jest.mock("lucide-react", () => ({
  AlertTriangle: () => <svg data-testid="alert-icon" />,
}));

describe("ErrorScreen", () => {
  it("renders default message when no message is provided", () => {
    render(<ErrorScreen />);
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  it("renders custom message when provided", () => {
    render(<ErrorScreen message="Network Error" />);
    expect(screen.getByText("Network Error")).toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    const onRetryMock = jest.fn();
    render(<ErrorScreen onRetry={onRetryMock} />);
    const button = screen.getByRole("button", { name: /retry/i });
    fireEvent.click(button);
    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });

  it("renders alert icon and card structure", () => {
    render(<ErrorScreen />);
    expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
  });
});
