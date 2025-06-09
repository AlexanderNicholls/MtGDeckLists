import { render } from "@testing-library/react";
import PrintingsIcon from "../components/CardElements/PrintingsIcon";
import { describe, test, expect } from "vitest";
import { DataProvider } from "../context/DataContext";
import MockData from "./__mocks__/MockData";
import { Card } from "../models/Card";

const Render_SUT = (showPrintingsIcon: boolean = true, cards: Card[] = []) =>
  render(
    <DataProvider value={{ search: "", cards, index: 0 }}>
      <PrintingsIcon showPrintingsIcon={showPrintingsIcon} />
    </DataProvider>
  );

describe("Printings Icon", () => {
  test("should render if printings available", () => {
    const { getByRole } = Render_SUT(true, [MockData.BlackLotus]);
    const expected = getByRole("button", { name: "card printings" });
    expect(expected).toBeInTheDocument();
  });

  test("should not render if only 1 printing available", () => {
    const { queryByRole } = Render_SUT(true, [MockData.GildedLotus]);
    const expected = queryByRole("button", { name: "card printings" });
    expect(expected).not.toBeInTheDocument();
  });

  test("should not render if no cards provided", () => {
    const { queryByRole } = Render_SUT(true, []);
    const expected = queryByRole("button", { name: "card printings" });
    expect(expected).not.toBeInTheDocument();
  });

  test("should not render if not valid to show printings", () => {
    const { queryByRole } = Render_SUT(false);
    const expected = queryByRole("button", { name: "card printings" });
    expect(expected).not.toBeInTheDocument();
  });
});
