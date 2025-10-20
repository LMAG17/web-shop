import { render, screen } from "@testing-library/react";
import { Spinner } from "@/shared/components/Spinner";

jest.mock("lucide-react", () => ({
  Loader2: () => <svg data-testid="loader-icon" />,
}));

describe("Spinner", () => {
  it("renders the loader icon", () => {
    render(<Spinner />);
    expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
  });

  it("renders inside a flex container", () => {
    const { container } = render(<Spinner />);
    const div = container.querySelector("div");
    expect(div).toHaveClass("flex", "justify-center", "items-center");
  });
});
