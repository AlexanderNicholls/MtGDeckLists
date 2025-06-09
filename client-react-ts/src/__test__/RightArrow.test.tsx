import { render } from "@testing-library/react";
import { expect, describe, test } from "vitest";
import RightArrow from "../components/UIControls/RightArrow";
import { Printing } from "../models/Card";
import MockData from "./__mocks__/MockData";

const nextArrow = "next arrow button";
const Render_SUT = (
  index: number = 0,
  selection: Printing[] = [],
  handleClick: () => void = () => {}
) =>
  render(
    <RightArrow index={index} selection={selection} handleClick={handleClick} />
  );

describe("Arrow buttons", () => {
  test("should render right arrow button", () => {
    const { getByRole } = Render_SUT();
    const rightArrow = getByRole("button", { name: nextArrow });
    expect(rightArrow).toBeInTheDocument();
  });

  test("should be greyed out if no selection provided", () => {
    const { getByRole } = Render_SUT();
    const rightArrow = getByRole("button", { name: nextArrow });
    expect(rightArrow).toHaveClass("disabled");
  });

  test("should be greyed out if only one item provided", () => {
    const { getByRole } = Render_SUT(0, [MockData.BlackLotus.printings[0]]);
    const rightArrow = getByRole("button", { name: nextArrow });
    expect(rightArrow).toHaveClass("disabled");
  });

  test("should not be greyed out if two items provided and viewing first selection", () => {
    const { getByRole } = Render_SUT(0, [
      MockData.BlackLotus.printings[0],
      MockData.BlackLotus.printings[1],
    ]);
    const rightArrow = getByRole("button", { name: nextArrow });
    expect(rightArrow).not.toHaveClass("disabled");
  });

  test.each([
    [1, [MockData.BlackLotus.printings[0], MockData.BlackLotus.printings[1]]],
    [2, [MockData.BlackLotus.printings[0], MockData.BlackLotus.printings[1], MockData.GildedLotus.printings[0]]],
    [3, [MockData.BlackLotus.printings[0], MockData.BlackLotus.printings[1], MockData.GildedLotus.printings[0], MockData.LotusPetal.printings[0]]],
  ])(
    "should be greyed out if multiple items provided and viewing last item",
    (index, selection) => {
      const { getByRole } = Render_SUT(index, selection);
      const rightArrow = getByRole("button", { name: nextArrow });
      expect(rightArrow).toHaveClass("disabled");
    }
  );
});
