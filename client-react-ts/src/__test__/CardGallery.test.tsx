import { expect, test, describe } from "vitest";
import { render } from "@testing-library/react";
import CardGallery from "../components/CardGallery";
import MockData from "./__mocks__/MockData";
import { Card } from "../models/Card";
import { CardProvider } from "../context/CardContext";
import { DataProvider } from "../context/DataContext";

const cardGallery = "card gallery";
const cardSelector = "card selector";
const printingSelector = "card printings selector";
const currentCardImage = "current card image";
const previousCardImage = "previous card image";
const nextCardImage = "next card image";

const Render_SUT = (cards: Card[] = [], index: number = 0) =>
  render(
    <DataProvider>
      <CardProvider value={{ cards, index }}>
        <CardGallery />
      </CardProvider>
    </DataProvider>
  );

describe("CardGallery component", () => {
  test("should render without crashing", () => {
    const { getByRole } = Render_SUT();
    const expected = getByRole("region", { name: cardGallery });
    expect(expected).toBeInTheDocument();
  });

  test("should render card selector", () => {
    const { getByRole } = Render_SUT();
    const expected = getByRole("region", { name: cardSelector });
    expect(expected).toBeInTheDocument();
  });

  test("should reset to viewing first card if index parameter invalid", () => {
    const invalidIndex = 3;
    const { getByRole, queryByRole } = Render_SUT(
      [MockData.BlackLotus, MockData.GildedLotus, MockData.LotusPetal],
      invalidIndex
    );
    const cardCenter = getByRole("img", {
      name: currentCardImage,
    }) as HTMLImageElement;
    const cardRight = getByRole("img", {
      name: nextCardImage,
    }) as HTMLImageElement;
    const cardLeft = queryByRole("img", {
      name: previousCardImage,
    }) as HTMLImageElement;

    expect(cardCenter).toBeInTheDocument();
    expect(cardRight).toBeInTheDocument();
    expect(cardLeft).not.toBeInTheDocument();
  });

  test("should not render printing gallery on initial render", () => {
    const { queryByRole } = Render_SUT();
    const expected = queryByRole("region", { name: printingSelector });
    expect(expected).not.toBeInTheDocument();
  });
});
