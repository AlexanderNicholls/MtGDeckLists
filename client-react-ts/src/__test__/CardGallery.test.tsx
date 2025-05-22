import { expect, test, describe } from "vitest";
import { render } from "@testing-library/react";
import CardGallery from "../components/CardGallery";
import { MockData } from "../msw/handlers";
import { DataProvider } from "../context/DataContext";

const IMG_URI_CardBack =
  "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=-1&type=card";

const Render_SUT = (cards: string[] = [], index: number = 0) =>
  render(
    <DataProvider value={{ search: "", cards, index }}>
      <CardGallery />
    </DataProvider>
  );

describe("CardGallery component", () => {
  test("should render without crashing", () => {
    const { queryByTestId } = Render_SUT();
    const expected = queryByTestId("card-gallery");
    expect(expected).toBeInTheDocument();
  });

  describe("Arrow buttons", () => {
    test("should render left and right arrow buttons", () => {
      const { queryByTestId } = Render_SUT();
      const leftArrow = queryByTestId("arrow-left");
      const rightArrow = queryByTestId("arrow-right");
      expect(leftArrow).toBeInTheDocument();
      expect(rightArrow).toBeInTheDocument();
    });

    test("should be greyed out if no cards provided", () => {
      const { queryByTestId } = Render_SUT();
      const leftArrow = queryByTestId("arrow-left");
      const rightArrow = queryByTestId("arrow-right");
      expect(leftArrow).toHaveClass("disabled");
      expect(rightArrow).toHaveClass("disabled");
    });

    test("should be greyed out if only one card provided", () => {
      const { queryByTestId } = Render_SUT([MockData.ImageUrl_BlackLotus]);
      const leftArrow = queryByTestId("arrow-left");
      const rightArrow = queryByTestId("arrow-right");
      expect(leftArrow).toHaveClass("disabled");
      expect(rightArrow).toHaveClass("disabled");
    });

    test("should grey out left arrow only if two cards provided", () => {
      const { queryByTestId } = Render_SUT([
        MockData.ImageUrl_BlackLotus,
        MockData.ImageUrl_GildedLotus,
      ]);
      const leftArrow = queryByTestId("arrow-left");
      const rightArrow = queryByTestId("arrow-right");
      expect(leftArrow).toHaveClass("disabled");
      expect(rightArrow).not.toHaveClass("disabled");
    });

    test("should grey out neither arrow if three cards provided and viewing second card", () => {
      const { queryByTestId } = Render_SUT(
        [
          MockData.ImageUrl_BlackLotus,
          MockData.ImageUrl_GildedLotus,
          MockData.ImageUrl_LotusPetal,
        ],
        1
      );
      const leftArrow = queryByTestId("arrow-left");
      const rightArrow = queryByTestId("arrow-right");
      expect(leftArrow).not.toHaveClass("disabled");
      expect(rightArrow).not.toHaveClass("disabled");
    });

    test("should grey out right arrow only if two cards provided and viewing last card", () => {
      const { queryByTestId } = Render_SUT(
        [MockData.ImageUrl_BlackLotus, MockData.ImageUrl_GildedLotus],
        1
      );
      const leftArrow = queryByTestId("arrow-left");
      const rightArrow = queryByTestId("arrow-right");
      expect(leftArrow).not.toHaveClass("disabled");
      expect(rightArrow).toHaveClass("disabled");
    });
  });

  describe("Image Elements", () => {
    test("should render card back if no cards provided", () => {
      const { queryByTestId } = Render_SUT();
      const cardImg = queryByTestId("card-image-current") as HTMLImageElement;
      expect(cardImg.src).toEqual(IMG_URI_CardBack);
    });

    test("should render card image if card provided", () => {
      const { queryByTestId } = Render_SUT([MockData.ImageUrl_BlackLotus]);
      const cardImg = queryByTestId("card-image-current") as HTMLImageElement;
      expect(cardImg.src).toEqual(MockData.ImageUrl_BlackLotus);
    });

    test("should only render center img element if only one card provided", () => {
      const { queryByTestId } = Render_SUT([MockData.ImageUrl_BlackLotus]);
      const cardImgCenter = queryByTestId(
        "card-image-current"
      ) as HTMLImageElement;
      const cardImgRight = queryByTestId("card-image-next") as HTMLImageElement;
      const cardImgLeft = queryByTestId("card-image-prev") as HTMLImageElement;
      expect(cardImgCenter).toBeInTheDocument();
      expect(cardImgRight).not.toBeInTheDocument();
      expect(cardImgLeft).not.toBeInTheDocument();
    });

    test("should only render center and right img element if two cards provided", () => {
      const { queryByTestId } = Render_SUT([
        MockData.ImageUrl_BlackLotus,
        MockData.ImageUrl_GildedLotus,
      ]);
      const cardImgCenter = queryByTestId(
        "card-image-current"
      ) as HTMLImageElement;
      const cardImgRight = queryByTestId("card-image-next") as HTMLImageElement;
      const cardImgLeft = queryByTestId("card-image-prev") as HTMLImageElement;

      expect(cardImgCenter).toBeInTheDocument();
      expect(cardImgCenter.src).toEqual(MockData.ImageUrl_BlackLotus);

      expect(cardImgRight).toBeInTheDocument();
      expect(cardImgRight.src).toEqual(MockData.ImageUrl_GildedLotus);

      expect(cardImgLeft).not.toBeInTheDocument();
    });

    test("should only render center and right img element if two or more cards provided and viewing first card", () => {
      const { queryByTestId } = Render_SUT([
        MockData.ImageUrl_BlackLotus,
        MockData.ImageUrl_GildedLotus,
        MockData.ImageUrl_LotusPetal,
      ]);
      const cardImgCenter = queryByTestId(
        "card-image-current"
      ) as HTMLImageElement;
      const cardImgRight = queryByTestId("card-image-next") as HTMLImageElement;
      const cardImgLeft = queryByTestId("card-image-prev") as HTMLImageElement;

      expect(cardImgCenter).toBeInTheDocument();
      expect(cardImgCenter.src).toEqual(MockData.ImageUrl_BlackLotus);

      expect(cardImgRight).toBeInTheDocument();
      expect(cardImgRight.src).toEqual(MockData.ImageUrl_GildedLotus);

      expect(cardImgLeft).not.toBeInTheDocument();
    });

    test("should only render center and left img element if two cards provided and viewing second card", () => {
      const secondCardIndex = 1;
      const { queryByTestId } = Render_SUT(
        [MockData.ImageUrl_BlackLotus, MockData.ImageUrl_GildedLotus],
        secondCardIndex
      );
      const cardImgCenter = queryByTestId(
        "card-image-current"
      ) as HTMLImageElement;
      const cardImgRight = queryByTestId("card-image-next") as HTMLImageElement;
      const cardImgLeft = queryByTestId("card-image-prev") as HTMLImageElement;

      expect(cardImgCenter).toBeInTheDocument();
      expect(cardImgCenter.src).toEqual(MockData.ImageUrl_GildedLotus);

      expect(cardImgRight).not.toBeInTheDocument();

      expect(cardImgLeft).toBeInTheDocument();
      expect(cardImgLeft.src).toEqual(MockData.ImageUrl_BlackLotus);
    });

    test("should only render center and left img element if three cards provided and viewing last card", () => {
      const lastCardIndex = 2;
      const { queryByTestId } = Render_SUT(
        [
          MockData.ImageUrl_BlackLotus,
          MockData.ImageUrl_GildedLotus,
          MockData.ImageUrl_LotusPetal,
        ],
        lastCardIndex
      );
      const cardImgCenter = queryByTestId(
        "card-image-current"
      ) as HTMLImageElement;
      const cardImgRight = queryByTestId("card-image-next") as HTMLImageElement;
      const cardImgLeft = queryByTestId("card-image-prev") as HTMLImageElement;

      expect(cardImgCenter).toBeInTheDocument();
      expect(cardImgCenter.src).toEqual(MockData.ImageUrl_LotusPetal);

      expect(cardImgRight).not.toBeInTheDocument();

      expect(cardImgLeft).toBeInTheDocument();
      expect(cardImgLeft.src).toEqual(MockData.ImageUrl_GildedLotus);
    });

    test("should render center, left and right img element if three or more cards provided and viewing second card", () => {
      const { queryByTestId } = Render_SUT(
        [
          MockData.ImageUrl_BlackLotus,
          MockData.ImageUrl_GildedLotus,
          MockData.ImageUrl_LotusPetal,
        ],
        1
      );
      const cardImgCenter = queryByTestId(
        "card-image-current"
      ) as HTMLImageElement;
      const cardImgRight = queryByTestId("card-image-next") as HTMLImageElement;
      const cardImgLeft = queryByTestId("card-image-prev") as HTMLImageElement;

      expect(cardImgCenter).toBeInTheDocument();
      expect(cardImgCenter.src).toEqual(MockData.ImageUrl_GildedLotus);

      expect(cardImgRight).toBeInTheDocument();
      expect(cardImgRight.src).toEqual(MockData.ImageUrl_LotusPetal);

      expect(cardImgLeft).toBeInTheDocument();
      expect(cardImgLeft.src).toEqual(MockData.ImageUrl_BlackLotus);
    });

    test("should reset to viewing first card if index parameter invalid", () => {
      const { queryByTestId } = Render_SUT(
        [
          MockData.ImageUrl_BlackLotus,
          MockData.ImageUrl_GildedLotus,
          MockData.ImageUrl_LotusPetal,
        ],
        3
      );
      const cardImgCenter = queryByTestId(
        "card-image-current"
      ) as HTMLImageElement;
      const cardImgRight = queryByTestId("card-image-next") as HTMLImageElement;
      const cardImgLeft = queryByTestId("card-image-prev") as HTMLImageElement;

      expect(cardImgCenter).toBeInTheDocument();
      expect(cardImgCenter.src).toEqual(MockData.ImageUrl_BlackLotus);

      expect(cardImgRight).toBeInTheDocument();
      expect(cardImgRight.src).toEqual(MockData.ImageUrl_GildedLotus);

      expect(cardImgLeft).not.toBeInTheDocument();
    });
  });
});
