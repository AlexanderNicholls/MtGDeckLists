import { render } from "@testing-library/react";
import DeckContents from "../components/DeckContents";
import { describe, test, expect, vi } from "vitest";
import type Deck from "../models/Deck";

const Render_SUT = (callback: (deck: Deck) => void = () => {}) =>
  render(<DeckContents handleSave={callback} />);

describe("Deck Contents component", () => {
  test("should render without crashing", () => {
    const { getByRole } = Render_SUT();
    const region = getByRole("region", { name: "deck contents section" });
    expect(region).toBeInTheDocument();
  });

  describe("Deck Contents Table", () => {
    test("should render a table", () => {
      const { getByRole } = Render_SUT();
      const table = getByRole("table", { name: "deck contents" });
      expect(table).toBeInTheDocument();
    });
  });

  describe("Save Button", () => {
    test("should render a save button", () => {
      const { getByRole } = Render_SUT();
      const button = getByRole("button", { name: "save deck button" });
      expect(button).toBeInTheDocument();
    });

    test("should make call if save button clicked", () => {
      const callback = vi.fn((deck: Deck) => {
        deck;
      });
      const { getByRole } = Render_SUT(callback);
      const button = getByRole("button", { name: "save deck button" });
      button.click();
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
