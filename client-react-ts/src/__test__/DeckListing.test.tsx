import { render } from "@testing-library/react";
import DeckListing from "../components/DeckListing";
import Deck from "../models/Deck";
import { describe, test, expect, vi } from "vitest";

const Render_SUT = (
  deck: Deck,
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
  test("should render without crashing", () => {
    const { getByRole } = Render_SUT(TestDeck);
    const element = getByRole("row", { name: "deck listing" });
    expect(element).toBeInTheDocument();
  });

  describe("deck name", () => {
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

  describe("edit button", () => {
    test("should render", () => {
      const { getByRole } = Render_SUT(TestDeck);
      const button = getByRole("button", { name: "edit deck button" });
      expect(button).toBeInTheDocument();
    });

    test("should make a call to edit when clicked", () => {
      const callBack = vi.fn((deck: Deck) => deck);
      const { getByRole } = Render_SUT(TestDeck, callBack);
      const button = getByRole("button", { name: "edit deck button" });
      button.click();
      expect(callBack).toHaveBeenCalledTimes(1);
      expect(callBack).toHaveBeenCalledWith<[Deck]>(TestDeck);
    });
  });

  describe("delete button", () => {
    test("should render", () => {
      const { getByRole } = Render_SUT(TestDeck);
      const button = getByRole("button", { name: "delete deck button" });
      expect(button).toBeInTheDocument();
    });

    test("should make a call to delete selected deck when clicked", () => {
      const callBack = vi.fn((deck: Deck) => deck);
      const { getByRole } = Render_SUT(TestDeck, () => {}, callBack);
      const button = getByRole("button", { name: "delete deck button" });
      button.click();
      expect(callBack).toHaveBeenCalledTimes(1);
      expect(callBack).toHaveBeenCalledWith<[Deck]>(TestDeck);
    });
  });
});
