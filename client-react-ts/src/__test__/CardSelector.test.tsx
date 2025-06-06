import { render } from "@testing-library/react";
import CardSelector from "../components/CardSelector";
import { describe, test, expect } from "vitest";

const closeButton = "close printings button";

const Render_SUT = (isPrintingsGallery: boolean = false) =>
  render(
    <CardSelector
      cardSelection={[]}
      selectionIndex={0}
      setIndex={() => {}}
      handleSelection={() => {}}
      handleCloseGallery={() => {}}
      isPrintingGallery={isPrintingsGallery}
    />
  );

describe("Card Selector", () => {
  test("should not render close button if not printings gallery", () => {
    const { queryByRole } = Render_SUT();
    const expected = queryByRole("button", { name: closeButton });
    expect(expected).not.toBeInTheDocument();
  });

  test("should render close button if printings gallery", () => {
    const { getByRole } = Render_SUT(true);
    const expected = getByRole("button", { name: closeButton });
    expect(expected).toBeInTheDocument();
  });
});
