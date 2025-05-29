import { expect, test, describe } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  test("should render without crashing", () => {
    const { queryByTestId } = render(<App />);
    const root = queryByTestId("root");
    expect(root).toBeInTheDocument();
  });
});
