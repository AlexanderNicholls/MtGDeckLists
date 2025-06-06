import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import CardContainer from "../components/CardElements/CardContainer";
import MockData from "./__mocks__/MockData";
import type { Printing } from "../models/Card";
import { DataProvider } from "../context/DataContext";

const IMG_URI_CardBack =
  "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=-1&type=card";

const currentCardImage = "current card image";
const previousCardImage = "previous card image";
const nextCardImage = "next card image";

const center = 0;
const left = -1;
const right = 1;

const Render_SUT = (
  cardSelection: Printing[] = [],
  position: number = center,
  index: number = 0,
  isPrintingsGallery: boolean = false,
  handleClick: () => void = () => {}
) =>
  render(
    <DataProvider
      value={{ search: "", cards: [MockData.BlackLotus], index: 0 }}
    >
      <CardContainer
        position={position}
        index={index}
        cardSelection={cardSelection}
        handleClick={handleClick}
        isPrintingsGallery={isPrintingsGallery}
      />
    </DataProvider>
  );

describe("Card Container", () => {
  test("should call handleClick when clicked", () => {
    let clickCount = 0;
    const logClick = () => (clickCount += 1);
    const { getByRole } = Render_SUT(
      [MockData.BlackLotus.printings[0]],
      center,
      0,
      false,
      logClick
    );
    const cardImg = getByRole("img", { name: currentCardImage });
    cardImg.click();
    expect(clickCount).toBe(1);
  });

  test("should not call handleClick when clicked if no cards provided", () => {
    let clickCount = 0;
    const logClick = () => (clickCount += 1);
    const { getByRole } = Render_SUT([], center, 0, false, logClick);
    const cardImg = getByRole("img", { name: currentCardImage });
    cardImg.click();
    expect(clickCount).toBe(0);
  });

  describe("center card", () => {
    test("should render with card back if no cards provided", () => {
      const { getByRole } = Render_SUT();
      const cardImg = getByRole("img", {
        name: currentCardImage,
      }) as HTMLImageElement;
      expect(cardImg.src).toEqual(IMG_URI_CardBack);
    });

    test("should render if card provided", () => {
      const { getByRole } = Render_SUT([MockData.BlackLotus.printings[0]]);
      const cardImg = getByRole("img", {
        name: currentCardImage,
      }) as HTMLImageElement;
      expect(cardImg.src).toEqual(MockData.BlackLotus.printings[0].imageUrl);
    });

    test("should render printing icon if not printings gallery", () => {
      const { getByRole } = Render_SUT(MockData.BlackLotus.printings);
      const expected = getByRole("button", { name: "card printings" });
      expect(expected).toBeInTheDocument();
    });

    test("should not render printing icon if printings gallery", () => {
      const { queryByRole } = Render_SUT(
        MockData.BlackLotus.printings,
        center,
        0,
        true
      );
      const expected = queryByRole("button", { name: "card printings" });
      expect(expected).not.toBeInTheDocument();
    });
  });

  describe("left card", () => {
    test("should not render if no cards provided", () => {
      const { queryByRole } = Render_SUT([], left);
      const cardImg = queryByRole("img", {
        name: previousCardImage,
      }) as HTMLImageElement;
      expect(cardImg).not.toBeInTheDocument();
    });

    test("should not render if only one card provided", () => {
      const { queryByRole } = Render_SUT(
        [MockData.BlackLotus.printings[0]],
        left
      );
      const cardImg = queryByRole("img", {
        name: previousCardImage,
      }) as HTMLImageElement;
      expect(cardImg).not.toBeInTheDocument();
    });

    test.each([
      [[MockData.BlackLotus.printings[0], MockData.BlackLotus.printings[1]]],
      [
        [
          MockData.BlackLotus.printings[0],
          MockData.BlackLotus.printings[1],
          MockData.GildedLotus.printings[1],
        ],
      ],
      [
        [
          MockData.BlackLotus.printings[0],
          MockData.BlackLotus.printings[1],
          MockData.GildedLotus.printings[0],
          MockData.LotusPetal.printings[0],
        ],
      ],
    ])("should not render if viewing the first of multiple cards", (cards) => {
      const { queryByRole } = Render_SUT(cards, left);
      const cardImg = queryByRole("img", {
        name: previousCardImage,
      }) as HTMLImageElement;
      expect(cardImg).not.toBeInTheDocument();
    });

    test.each([
      [1, MockData.BlackLotus.printings[0].imageUrl],
      [2, MockData.BlackLotus.printings[1].imageUrl],
      [3, MockData.GildedLotus.printings[0].imageUrl],
    ])(
      "should render if viewing any card past the first of multiple cards",
      (index, imageUrl) => {
        const { queryByRole } = Render_SUT(
          [
            MockData.BlackLotus.printings[0],
            MockData.BlackLotus.printings[1],
            MockData.GildedLotus.printings[0],
            MockData.LotusPetal.printings[0],
          ],
          left,
          index
        );
        const cardImg = queryByRole("img", {
          name: previousCardImage,
        }) as HTMLImageElement;
        expect(cardImg.src).toEqual(imageUrl);
      }
    );

    test("should not render printing icon", () => {
      const { queryByRole } = Render_SUT(MockData.BlackLotus.printings, left);
      const expected = queryByRole("button", { name: "card printings" });
      expect(expected).not.toBeInTheDocument();
    });
  });

  describe("right card", () => {
    test("should not render if no cards provided", () => {
      const { queryByRole } = Render_SUT([], right);
      const cardImg = queryByRole("img", {
        name: nextCardImage,
      }) as HTMLImageElement;
      expect(cardImg).not.toBeInTheDocument();
    });

    test("should not render if only one card provided", () => {
      const { queryByRole } = Render_SUT(
        [MockData.BlackLotus.printings[0]],
        right
      );
      const cardImg = queryByRole("img", {
        name: nextCardImage,
      }) as HTMLImageElement;
      expect(cardImg).not.toBeInTheDocument();
    });

    test.each([
      [[MockData.BlackLotus.printings[0], MockData.BlackLotus.printings[1]], 1],
      [
        [
          MockData.BlackLotus.printings[0],
          MockData.BlackLotus.printings[1],
          MockData.GildedLotus.printings[1],
        ],
        2,
      ],
      [
        [
          MockData.BlackLotus.printings[0],
          MockData.BlackLotus.printings[1],
          MockData.GildedLotus.printings[0],
          MockData.LotusPetal.printings[0],
        ],
        3,
      ],
    ])(
      "should not render if viewing the last of multiple cards",
      (cards, index) => {
        const { queryByRole } = Render_SUT(cards, right, index);
        const cardImg = queryByRole("img", {
          name: nextCardImage,
        }) as HTMLImageElement;
        expect(cardImg).not.toBeInTheDocument();
      }
    );

    test.each([
      [0, MockData.BlackLotus.printings[1].imageUrl],
      [1, MockData.GildedLotus.printings[0].imageUrl],
      [2, MockData.LotusPetal.printings[0].imageUrl],
    ])(
      "should render if viewing any card before the last of multiple cards",
      (index, imageUrl) => {
        const { queryByRole } = Render_SUT(
          [
            MockData.BlackLotus.printings[0],
            MockData.BlackLotus.printings[1],
            MockData.GildedLotus.printings[0],
            MockData.LotusPetal.printings[0],
          ],
          right,
          index
        );
        const cardImg = queryByRole("img", {
          name: nextCardImage,
        }) as HTMLImageElement;
        expect(cardImg.src).toEqual(imageUrl);
      }
    );

    test("should not render printing icon", () => {
      const { queryByRole } = Render_SUT(MockData.BlackLotus.printings, right);
      const expected = queryByRole("button", { name: "card printings" });
      expect(expected).not.toBeInTheDocument();
    });
  });

  // TODO: Finish writing these tests
});
