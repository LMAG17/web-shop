import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("store hooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("useAppDispatch should return dispatch from react-redux", () => {
    const mockDispatch = jest.fn();
    // @ts-ignore
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const dispatch = useAppDispatch();
    expect(useDispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toBe(mockDispatch);
  });

  it("useAppSelector should call react-redux useSelector", () => {
    const mockSelector = jest.fn();
    // @ts-ignore
    (useSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn(mockSelector)
    );

    const result = useAppSelector((state) => state);
    expect(useSelector).toHaveBeenCalledTimes(1);
    expect(typeof result).toBe("function");
  });
});
