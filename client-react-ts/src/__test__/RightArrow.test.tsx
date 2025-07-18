import { render } from "@testing-library/react";
import { expect, describe, test, vi } from "vitest";
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

  describe("should be greyed out", () => {
    test("if no selection provided", () => {
      const { getByRole } = Render_SUT();
      const rightArrow = getByRole("button", { name: nextArrow });
      expect(rightArrow).toHaveClass("disabled");
    });

    test("if only one item provided", () => {
      const { getByRole } = Render_SUT(0, [MockData.BlackLotus.printings[0]]);
      const rightArrow = getByRole("button", { name: nextArrow });
      expect(rightArrow).toHaveClass("disabled");
    });

    test.each([
      [1, [MockData.BlackLotus.printings[0], MockData.BlackLotus.printings[1]]],
      [
        2,
        [
          MockData.BlackLotus.printings[0],
          MockData.BlackLotus.printings[1],
          MockData.GildedLotus.printings[0],
        ],
      ],
      [
        3,
        [
          MockData.BlackLotus.printings[0],
          MockData.BlackLotus.printings[1],
          MockData.GildedLotus.printings[0],
          MockData.LotusPetal.printings[0],
        ],
      ],
    ])(
      "if multiple items provided and viewing last item",
      (index, selection) => {
        const { getByRole } = Render_SUT(index, selection);
        const rightArrow = getByRole("button", { name: nextArrow });
        expect(rightArrow).toHaveClass("disabled");
      }
    );
  });

  describe("should not be greyed out", () => {
    test.each([
      [0, [MockData.BlackLotus.printings[0], MockData.BlackLotus.printings[1]]],
      [
        0,
        [
          MockData.BlackLotus.printings[0],
          MockData.BlackLotus.printings[1],
          MockData.GildedLotus.printings[0],
        ],
      ],
      [
        1,
        [
          MockData.BlackLotus.printings[0],
          MockData.BlackLotus.printings[1],
          MockData.GildedLotus.printings[0],
          MockData.LotusPetal.printings[0],
        ],
      ],
    ])(
      "if multiple items provided and not viewing last item",
      (index, selection) => {
        const { getByRole } = Render_SUT(index, selection);
        const rightArrow = getByRole("button", { name: nextArrow });
        expect(rightArrow).not.toHaveClass("disabled");
      }
    );
  });

  test("should call handleClick when clicked", () => {
    const clickCallBack = vi.fn(() => {});
    const { getByRole } = Render_SUT(
      0,
      [MockData.BlackLotus.printings[0], MockData.BlackLotus.printings[1]],
      clickCallBack
    );
    const rightArrow = getByRole("button", { name: nextArrow });
    rightArrow.click();
    expect(clickCallBack).toHaveBeenCalledTimes(1);
  });
});
