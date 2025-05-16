import { expect, test, describe } from "vitest";
import { render } from "@testing-library/react";
import CardGallery from "../components/CardGallery";

describe("CardGallery component", () => {
  test("should render without crashing", () => {
    const { queryByTestId } = render(
      <CardGallery cards={[]} index={0} setIndex={() => {}} />
    );
    const root = queryByTestId("card-gallery");
    expect(root).toBeInTheDocument();
  });
});
