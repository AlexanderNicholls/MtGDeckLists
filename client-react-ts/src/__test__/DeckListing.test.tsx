import { render } from "@testing-library/react";
import DeckListing from "../components/DeckListing";
import Deck from "../models/Deck";
import { describe, test, expect, vi } from "vitest";

const Render_SUT = (
  deck: Deck = {} as Deck,
  handleEdit: (deck: Deck) => void = () => {},
  handleDelete: (deck: Deck) => void = () => {}
) =>
  render(
    <DeckListing
      deck={deck}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
const TestDeck = { id: 1, name: "TestDeck", cards: [] } as Deck;

describe("Deck Listing component", () => {
  describe("should render", () => {
    test("without crashing", () => {
      const { getByRole } = Render_SUT(TestDeck);
      const element = getByRole("row", { name: "deck listing" });
      expect(element).toBeInTheDocument();
    });
  });

  describe("deck name", () => {
    test("should not render if deck name empty", () => {
      const { queryByRole } = Render_SUT({ ...TestDeck, name: "" });
      const cell = queryByRole("cell", { name: "deck name" });
      expect(cell).not.toBeInTheDocument();
    });

    test.each([[-1], [0]])(
      "should not render if deck id invalid",
      (id: number) => {
        const { queryByRole } = Render_SUT({ ...TestDeck, id: id });
        const cell = queryByRole("cell", { name: "deck name" });
        expect(cell).not.toBeInTheDocument();
      }
    );

    test("should not render if card list not an array", () => {
      const { queryByRole } = Render_SUT({ ...TestDeck, cards: {} as any });
      const cell = queryByRole("cell", { name: "deck name" });
      expect(cell).not.toBeInTheDocument();
    });

    test("should render deck name if given deck", () => {
      const { getByRole } = Render_SUT(TestDeck);
      const cell = getByRole("cell", { name: "deck name" });
      expect(cell).toHaveTextContent(TestDeck.name);
    });

    test.each([
      ["abcdefghijklmn"],
      ["abcdefghijklmnop"],
      ["abcdefghijklmnopqrs"],
    ])(
      "should truncate deck name if more than 13 characters",
      (longName: string) => {
        const expected = "abcdefghij...";
        const { getByRole } = Render_SUT({ id: 1, name: longName, cards: [] });
        const deckName = getByRole("cell", { name: "deck name" });
        expect(deckName).toHaveTextContent(expected);
      }
    );

    test.each([["abcdefg"], ["abcdefghijkl"], ["abcdefghijklm"]])(
      "should not truncate deck name if no more than 13 characters",
      (shortName: string) => {
        const { getByRole } = Render_SUT({ id: 1, name: shortName, cards: [] });
        const deckName = getByRole("cell", { name: "deck name" });
        expect(deckName).toHaveTextContent(shortName);
      }
    );
  });

  describe("deck card count", () => {
    test("should not render if no deck", () => {
      const { queryByLabelText } = Render_SUT();
      const label = queryByLabelText("deck card count");
      expect(label).not.toBeInTheDocument();
    });

    test("should render if given a deck", () => {
      const { getByLabelText } = Render_SUT(TestDeck);
      const label = getByLabelText("deck card count");
      expect(label).toBeInTheDocument();
    });

    test("should show 0/100 if no cards in deck", () => {
      const { getByLabelText } = Render_SUT(TestDeck);
      const label = getByLabelText("deck card count");
      expect(label).toHaveTextContent("0/100");
    });

    test.each([[1], [5], [10], [50], [99], [100]])(
      "should show correct card count if cards in deck",
      (cardCount: number) => {
        const deckWithCards = { ...TestDeck, cards: Array(cardCount).fill({}) };
        const { getByLabelText } = Render_SUT(deckWithCards);
        const label = getByLabelText("deck card count");
        expect(label.textContent).toBe(`${cardCount}/100`);
      }
    );
  });

  describe("edit button", () => {
    test("should render", () => {
      const { getByRole } = Render_SUT(TestDeck);
      const button = getByRole("button", { name: "edit deck button" });
      expect(button).toBeInTheDocument();
    });

    test("should make a call to edit when clicked", () => {
      const editCallBack = vi.fn((deck: Deck) => deck);
      const { getByRole } = Render_SUT(TestDeck, editCallBack);
      const button = getByRole("button", { name: "edit deck button" });
      button.click();
      expect(editCallBack).toHaveBeenCalledTimes(1);
      expect(editCallBack).toHaveBeenCalledWith<[Deck]>(TestDeck);
    });
  });

  describe("delete button", () => {
    test("should render", () => {
      const { getByRole } = Render_SUT(TestDeck);
      const button = getByRole("button", { name: "delete deck button" });
      expect(button).toBeInTheDocument();
    });

    test("should make a call to delete selected deck when clicked", () => {
      const deleteCallback = vi.fn((deck: Deck) => deck);
      const { getByRole } = Render_SUT(TestDeck, () => {}, deleteCallback);
      const button = getByRole("button", { name: "delete deck button" });
      button.click();
      expect(deleteCallback).toHaveBeenCalledTimes(1);
      expect(deleteCallback).toHaveBeenCalledWith<[Deck]>(TestDeck);
    });
  });
});
