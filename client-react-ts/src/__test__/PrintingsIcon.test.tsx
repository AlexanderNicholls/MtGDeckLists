import { render } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Card, Printing } from "../models/Card";
import { CardProvider } from "../context/CardContext";
import PrintingsIcon from "../components/CardElements/PrintingsIcon";
import MockData from "./__mocks__/MockData";

const Render_SUT = (
  showPrintingsIcon: boolean = true,
  cards: Card[] = [],
  clickCallback: () => void = () => {}
) =>
  render(
    <CardProvider value={{ cards, index: 0 }}>
      <PrintingsIcon
        showPrintingsIcon={showPrintingsIcon}
        handleClick={clickCallback}
      />
    </CardProvider>
  );

describe("Printings Icon", () => {
  describe("should render", () => {
    test("if printings available", () => {
      const { getByRole } = Render_SUT(true, [MockData.BlackLotus]);
      const expected = getByRole("button", { name: "card printings" });
      expect(expected).toBeInTheDocument();
    });
  });
  describe("should not render", () => {
    test("if only 1 printing available", () => {
      const { queryByRole } = Render_SUT(true, [MockData.GildedLotus]);
      const expected = queryByRole("button", { name: "card printings" });
      expect(expected).not.toBeInTheDocument();
    });

    test("if no cards provided", () => {
      const { queryByRole } = Render_SUT(true, []);
      const expected = queryByRole("button", { name: "card printings" });
      expect(expected).not.toBeInTheDocument();
    });

    test("if not valid to show printings", () => {
      const { queryByRole } = Render_SUT(false);
      const expected = queryByRole("button", { name: "card printings" });
      expect(expected).not.toBeInTheDocument();
    });
  });

  test("should call on click callback when clicked", () => {
    const clickCallback = vi.fn();
    const { getByRole } = Render_SUT(
      true,
      [MockData.BlackLotus],
      clickCallback
    );
    const button = getByRole("button", { name: "card printings" });
    button.click();
    expect(clickCallback).toHaveBeenCalledTimes(1);
  });

  test.each([2, 3, 4, 5])(
    "should display printings count if 2 or more printings given",
    (printings: number) => {
      const card = {
        name: "Test Card",
        selectedPrinting: 0,
        printings: Array.from({ length: printings }).map(
          () => ({} as Printing)
        ),
      } as Card;
      const { getByLabelText } = Render_SUT(true, [card]);
      const countElement = getByLabelText("printings count");
      expect(countElement.textContent).toBe(`${printings}`);
    }
  );
});
