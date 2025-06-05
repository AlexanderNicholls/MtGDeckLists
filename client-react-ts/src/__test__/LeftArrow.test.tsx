import { render } from "@testing-library/react";
import { expect, describe, test } from "vitest";
import LeftArrow from "../components/UIControls/LeftArrow";

const previousArrow = "previous arrow button";
const Render_SUT = (index: number = 0, handleClick: () => void = () => {}) =>
  render(<LeftArrow index={index} handleClick={handleClick} />);

describe("Arrow buttons", () => {
  test("should render left arrow button", () => {
    const { getByRole } = Render_SUT();
    const leftArrow = getByRole("button", { name: previousArrow });
    expect(leftArrow).toBeInTheDocument();
  });

  test("should be greyed out if either no selection provided or viewing leftmost selection", () => {
    const { getByRole } = Render_SUT();
    const leftArrow = getByRole("button", { name: previousArrow });
    expect(leftArrow).toHaveClass("disabled");
  });

  test.each([1, 2, 3, 4, 5])(
    "should not be greyed out viewing any selection past first",
    (index) => {
      const { getByRole } = Render_SUT(index);
      const leftArrow = getByRole("button", { name: previousArrow });
      expect(leftArrow).not.toHaveClass("disabled");
    }
  );

  test("should call handleClick when clicked", () => {
    let clickCount = 0;
    const logClick = () => (clickCount += 1);
    const { getByRole } = Render_SUT(1, logClick);
    const leftArrow = getByRole("button", { name: previousArrow });
    leftArrow.click();
    expect(clickCount).toBe(1);
  });
});
