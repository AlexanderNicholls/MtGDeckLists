import { render } from "@testing-library/react";
import DeckListings from "../components/DeckListings";
import { expect, describe, test } from "vitest";
import type Deck from "../models/Deck";
import { DataProvider } from "../context/DataContext";

const Render_SUT = (decks: Deck[] = []) =>
  render(
    <DataProvider value={{ decks: decks }}>
      <DeckListings />
    </DataProvider>
  );

describe("Deck Listings Component", () => {
  test("should render without crashing", () => {
    const { getByRole } = Render_SUT();
    const expected = getByRole("region", { name: "deck listings section" });
    expect(expected).toBeInTheDocument();
  });

  test("should render a heading", () => {
    const { getByRole } = Render_SUT();
    const expected = getByRole("heading", { name: "deck listings heading" });
    expect(expected).toHaveTextContent("Deck Listings:");
  });

  test("should render a table", () => {
    const { getByRole } = Render_SUT();
    const expected = getByRole("table", { name: "deck listings" });
    expect(expected).toBeInTheDocument();
  });

  test("should render an empty table if no decks loaded", () => {
    const { getByRole } = Render_SUT();
    const expected = getByRole("rowgroup", {
      name: "deck listings content",
    }) as HTMLTableElement;
    expect(expected.children).toHaveLength(0);
  });

  test("should render a table with one row if one deck loaded", () => {
    const decks = [{ id: 1, name: "TestName", cards: [] } as Deck];
    const { getAllByRole, getByRole } = Render_SUT(decks);
    const rows = getAllByRole("row", {
      name: "deck listing",
    }) as HTMLTableRowElement[];
    expect(rows).toHaveLength(1);
    const deckName = getByRole("cell", { name: "deck name" });
    expect(deckName).toHaveTextContent(decks[0].name);
  });

  test("should render a table with two rows if two decks loaded", () => {
    const decks = [
      { id: 1, name: "TestName1", cards: [] } as Deck,
      { id: 2, name: "TestName2", cards: [] } as Deck,
    ];
    const { getAllByRole } = Render_SUT(decks);
    const rows = getAllByRole("row", {
      name: "deck listing",
    }) as HTMLTableRowElement[];

    expect(rows).toHaveLength(2);

    const deckName = getAllByRole("cell", { name: "deck name" });
    expect(deckName[0]).toHaveTextContent(decks[0].name);
    expect(deckName[1]).toHaveTextContent(decks[1].name);
  });
});
