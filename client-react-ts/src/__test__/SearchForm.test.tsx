import { expect, test, describe } from "vitest";
import { render } from "@testing-library/react";
import SearchForm from "../components/SearchForm";
import axios from "axios";
import { MockApiUrl, MockData } from "../msw/handlers";

describe("SearchForm component", () => {
  test("should render without crashing", () => {
    const { queryByTestId } = render(
      <SearchForm
        cards={[]}
        setCards={() => {}}
        index={0}
        setIndex={() => {}}
      />
    );
    const root = queryByTestId("search-form");
    expect(root).toBeInTheDocument();
  });

  test("msw", async () => {
    const result = await axios.get(MockApiUrl.BaseUrl, {
      params: {
        cardName: MockData.CardName_BlackLotus,
      },
    });
    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toBe(MockData.ImageUrl_BlackLotus);
  });
});
