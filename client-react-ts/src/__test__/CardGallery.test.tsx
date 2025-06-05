import { expect, test, describe } from "vitest";
import { render, waitFor } from "@testing-library/react";
import CardGallery from "../components/CardGallery";
import MockData from "./__mocks__/MockData";
import { DataProvider } from "../context/DataContext";
import { Card } from "../models/Card";

const cardGallery = "card gallery";
const cardSelector = "card selector";
const currentCardImage = "current card image";
const previousCardImage = "previous card image";
const nextCardImage = "next card image";

const Render_SUT = (cards: Card[] = [], index: number = 0) =>
  render(
    <DataProvider value={{ search: "", cards, index }}>
      <CardGallery />
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

  describe("Card gallery printings selector", () => {
    test("should not intially render", () => {
      const { queryByRole } = Render_SUT();
      const expected = queryByRole("region", {
        name: "card printings selector",
      });
      expect(expected).not.toBeInTheDocument();
    });

    test("should render when clicking on the center card image", async () => {
      const { getByRole } = Render_SUT([MockData.BlackLotus]);
      const cardImgCenter = getByRole("img", { name: currentCardImage });

      cardImgCenter.click();

      await waitFor(() => {
        const expected = getByRole("region", {
          name: "card printings selector",
        });
        expect(expected).toBeInTheDocument();
      });
    });

    test("should close printings gallery on clicking center print image", async () => {
      const { getByRole, queryByRole } = Render_SUT([MockData.BlackLotus]);
      const cardImgCenter = getByRole("img", {
        name: currentCardImage,
      }) as HTMLImageElement;

      cardImgCenter.click();

      await waitFor(async () => {
        const printingsGallery = queryByRole("region", {
          name: "card printings selector",
        });
        expect(printingsGallery).not.toBeInTheDocument();
      });
    });
  });
});
