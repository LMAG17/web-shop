import { DataWrapper } from "@/shared/components/DataWrapper";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("@/shared/components/LoadingScreen", () => ({
  LoadingScreen: () => <div data-testid="loading-screen">Loading...</div>,
}));

jest.mock("@/shared/components/ErrorScreen", () => ({
  ErrorScreen: ({ message, onRetry }: any) => (
    <div data-testid="error-screen">
      <p>{message}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  ),
}));

describe("DataWrapper", () => {
  it("renders LoadingScreen when isLoading is true", () => {
    render(<DataWrapper isLoading>Children</DataWrapper>);
    expect(screen.getByTestId("loading-screen")).toBeInTheDocument();
  });

  it("renders ErrorScreen when error is provided", () => {
    render(<DataWrapper error="Error occurred">Children</DataWrapper>);
    expect(screen.getByTestId("error-screen")).toBeInTheDocument();
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
  });

  it("calls onRetry when Retry button is clicked", () => {
    const onRetryMock = jest.fn();
    render(
      <DataWrapper error="Error" onRetry={onRetryMock}>
        Children
      </DataWrapper>
    );

    fireEvent.click(screen.getByText("Retry"));
    expect(onRetryMock).toHaveBeenCalled();
  });

  it("renders children when not loading and no error", () => {
    render(<DataWrapper>Visible content</DataWrapper>);
    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });
});
