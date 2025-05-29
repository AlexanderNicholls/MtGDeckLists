import { expect, test, describe } from "vitest";
import { render } from "@testing-library/react";
import CardGallery from "../components/CardGallery";
import MockData from "./__mocks__/MockData";
import { DataProvider } from "../context/DataContext";

const IMG_URI_CardBack =
  "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=-1&type=card";

const cardGallery = "card gallery";
const previousArrow = "previous arrow button";
const nextArrow = "next arrow button";
const currentCardImage = "current card image";
const previousCardImage = "previous card image";
const nextCardImage = "next card image";

const Render_SUT = (cards: string[] = [], index: number = 0) =>
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

  describe("Arrow buttons", () => {
    test("should render left and right arrow buttons", () => {
      const { getByRole } = Render_SUT();
      const leftArrow = getByRole("button", { name: previousArrow });
      const rightArrow = getByRole("button", { name: nextArrow });
      expect(leftArrow).toBeInTheDocument();
      expect(rightArrow).toBeInTheDocument();
    });

    test("should be greyed out if no cards provided", () => {
      const { getByRole } = Render_SUT();
      const leftArrow = getByRole("button", { name: previousArrow });
      const rightArrow = getByRole("button", { name: nextArrow });
      expect(leftArrow).toHaveClass("disabled");
      expect(rightArrow).toHaveClass("disabled");
    });

    test("should be greyed out if only one card provided", () => {
      const { getByRole } = Render_SUT([MockData.ImageUrl_BlackLotus]);
      const leftArrow = getByRole("button", { name: previousArrow });
      const rightArrow = getByRole("button", { name: nextArrow });
      expect(leftArrow).toHaveClass("disabled");
      expect(rightArrow).toHaveClass("disabled");
    });

    test("should grey out left arrow only if two cards provided", () => {
      const { getByRole } = Render_SUT([
        MockData.ImageUrl_BlackLotus,
        MockData.ImageUrl_GildedLotus,
      ]);
      const leftArrow = getByRole("button", { name: previousArrow });
      const rightArrow = getByRole("button", { name: nextArrow });
      expect(leftArrow).toHaveClass("disabled");
      expect(rightArrow).not.toHaveClass("disabled");
    });

    test("should grey out neither arrow if three cards provided and viewing second card", () => {
      const secondCardIndex = 1;
      const { getByRole } = Render_SUT(
        [
          MockData.ImageUrl_BlackLotus,
          MockData.ImageUrl_GildedLotus,
          MockData.ImageUrl_LotusPetal,
        ],
        secondCardIndex
      );
      const leftArrow = getByRole("button", { name: previousArrow });
      const rightArrow = getByRole("button", { name: nextArrow });
      expect(leftArrow).not.toHaveClass("disabled");
      expect(rightArrow).not.toHaveClass("disabled");
    });

    test("should grey out right arrow only if two cards provided and viewing last card", () => {
      const secondCardIndex = 1;
      const { getByRole } = Render_SUT(
        [MockData.ImageUrl_BlackLotus, MockData.ImageUrl_GildedLotus],
        secondCardIndex
      );
      const leftArrow = getByRole("button", { name: previousArrow });
      const rightArrow = getByRole("button", { name: nextArrow });
      expect(leftArrow).not.toHaveClass("disabled");
      expect(rightArrow).toHaveClass("disabled");
    });
  });

  describe("Image Elements", () => {
    test("should render card back if no cards provided", () => {
      const { getByRole } = Render_SUT();
      const cardImg = getByRole("img", {
        name: currentCardImage,
      }) as HTMLImageElement;
      expect(cardImg.src).toEqual(IMG_URI_CardBack);
    });

    test("should render card image if card provided", () => {
      const { getByRole } = Render_SUT([MockData.ImageUrl_BlackLotus]);
      const cardImg = getByRole("img", {
        name: currentCardImage,
      }) as HTMLImageElement;
      expect(cardImg.src).toEqual(MockData.ImageUrl_BlackLotus);
    });

    test("should only render center img element if only one card provided", () => {
      const { getByRole, queryByRole } = Render_SUT([
        MockData.ImageUrl_BlackLotus,
      ]);
      const cardImgCenter = getByRole("img", {
        name: currentCardImage,
      }) as HTMLImageElement;
      const cardImgRight = queryByRole("img", {
        name: nextCardImage,
      }) as HTMLImageElement;
      const cardImgLeft = queryByRole("img", {
        name: previousCardImage,
      }) as HTMLImageElement;

      expect(cardImgCenter).toBeInTheDocument();
      expect(cardImgRight).not.toBeInTheDocument();
      expect(cardImgLeft).not.toBeInTheDocument();
    });

    test("should only render center and right img element if two cards provided", () => {
      const { getByRole, queryByRole } = Render_SUT([
        MockData.ImageUrl_BlackLotus,
        MockData.ImageUrl_GildedLotus,
      ]);
      const cardImgCenter = getByRole("img", {
        name: currentCardImage,
      }) as HTMLImageElement;
      const cardImgRight = getByRole("img", {
        name: nextCardImage,
      }) as HTMLImageElement;
      const cardImgLeft = queryByRole("img", {
        name: previousCardImage,
      }) as HTMLImageElement;

      expect(cardImgCenter.src).toEqual(MockData.ImageUrl_BlackLotus);
      expect(cardImgRight.src).toEqual(MockData.ImageUrl_GildedLotus);
      expect(cardImgLeft).not.toBeInTheDocument();
    });

    test("should only render center and right img element if two or more cards provided and viewing first card", () => {
      const { getByRole, queryByRole } = Render_SUT([
        MockData.ImageUrl_BlackLotus,
        MockData.ImageUrl_GildedLotus,
        MockData.ImageUrl_LotusPetal,
      ]);
      const cardImgCenter = getByRole("img", {
        name: currentCardImage,
      }) as HTMLImageElement;
      const cardImgRight = getByRole("img", {
        name: nextCardImage,
      }) as HTMLImageElement;
      const cardImgLeft = queryByRole("img", {
        name: previousCardImage,
      }) as HTMLImageElement;

      expect(cardImgCenter.src).toEqual(MockData.ImageUrl_BlackLotus);
      expect(cardImgRight.src).toEqual(MockData.ImageUrl_GildedLotus);
      expect(cardImgLeft).not.toBeInTheDocument();
    });

    test("should only render center and left img element if two cards provided and viewing second card", () => {
      const secondCardIndex = 1;
      const { getByRole, queryByRole } = Render_SUT(
        [MockData.ImageUrl_BlackLotus, MockData.ImageUrl_GildedLotus],
        secondCardIndex
      );
      const cardImgCenter = getByRole("img", {
        name: currentCardImage,
      }) as HTMLImageElement;
      const cardImgRight = queryByRole("img", {
        name: nextCardImage,
      }) as HTMLImageElement;
      const cardImgLeft = getByRole("img", {
        name: previousCardImage,
      }) as HTMLImageElement;

      expect(cardImgCenter.src).toEqual(MockData.ImageUrl_GildedLotus);
      expect(cardImgRight).not.toBeInTheDocument();
      expect(cardImgLeft.src).toEqual(MockData.ImageUrl_BlackLotus);
    });

    test("should only render center and left img element if three cards provided and viewing last card", () => {
      const lastCardIndex = 2;
      const { getByRole, queryByRole } = Render_SUT(
        [
          MockData.ImageUrl_BlackLotus,
          MockData.ImageUrl_GildedLotus,
          MockData.ImageUrl_LotusPetal,
        ],
        lastCardIndex
      );
      const cardImgCenter = getByRole("img", {
        name: currentCardImage,
      }) as HTMLImageElement;
      const cardImgRight = queryByRole("img", {
        name: nextCardImage,
      }) as HTMLImageElement;
      const cardImgLeft = getByRole("img", {
        name: previousCardImage,
      }) as HTMLImageElement;

      expect(cardImgCenter.src).toEqual(MockData.ImageUrl_LotusPetal);
      expect(cardImgRight).not.toBeInTheDocument();
      expect(cardImgLeft.src).toEqual(MockData.ImageUrl_GildedLotus);
    });

    test("should render center, left and right img element if three or more cards provided and viewing second card", () => {
      const secondCardIndex = 1;
      const { getByRole } = Render_SUT(
        [
          MockData.ImageUrl_BlackLotus,
          MockData.ImageUrl_GildedLotus,
          MockData.ImageUrl_LotusPetal,
        ],
        secondCardIndex
      );
      const cardImgCenter = getByRole("img", {
        name: currentCardImage,
      }) as HTMLImageElement;
      const cardImgRight = getByRole("img", {
        name: nextCardImage,
      }) as HTMLImageElement;
      const cardImgLeft = getByRole("img", {
        name: previousCardImage,
      }) as HTMLImageElement;

      expect(cardImgCenter.src).toEqual(MockData.ImageUrl_GildedLotus);
      expect(cardImgRight.src).toEqual(MockData.ImageUrl_LotusPetal);
      expect(cardImgLeft.src).toEqual(MockData.ImageUrl_BlackLotus);
    });

    test("should reset to viewing first card if index parameter invalid", () => {
      const invalidIndex = 3;
      const { getByRole, queryByRole } = Render_SUT(
        [
          MockData.ImageUrl_BlackLotus,
          MockData.ImageUrl_GildedLotus,
          MockData.ImageUrl_LotusPetal,
        ],
        invalidIndex
      );
      const cardImgCenter = getByRole("img", {
        name: currentCardImage,
      }) as HTMLImageElement;
      const cardImgRight = getByRole("img", {
        name: nextCardImage,
      }) as HTMLImageElement;
      const cardImgLeft = queryByRole("img", {
        name: previousCardImage,
      }) as HTMLImageElement;

      expect(cardImgCenter).toBeInTheDocument();
      expect(cardImgCenter.src).toEqual(MockData.ImageUrl_BlackLotus);

      expect(cardImgRight).toBeInTheDocument();
      expect(cardImgRight.src).toEqual(MockData.ImageUrl_GildedLotus);

      expect(cardImgLeft).not.toBeInTheDocument();
    });
  });
});
