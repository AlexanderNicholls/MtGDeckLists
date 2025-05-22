import { expect, test, describe } from "vitest";
import { render } from "@testing-library/react";
import SearchForm from "../components/SearchForm";
import { MockApiUrl, MockData, MonitorAPI } from "../msw/handlers";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { DataProvider } from "../context/DataContext";

const Render_SUT = (cardName: string = "") =>
  render(
    <DataProvider>
      <SearchForm initialSearch={cardName} />
    </DataProvider>
  );

describe("SearchForm component", () => {
  test("should render without crashing", () => {
    const { queryByTestId } = Render_SUT();
    const expected = queryByTestId("search-form");
    expect(expected).toBeInTheDocument();
  });

  describe("should render an input text box", () => {
    test("without crashing", () => {
      const { queryByTestId } = Render_SUT();
      const expected = queryByTestId("search-input");
      expect(expected).toBeInTheDocument();
    });

    test("with correct placeholder text", () => {
      const { queryByTestId } = Render_SUT();
      const input = queryByTestId("search-input");
      const expected = "Enter a Card Name...";
      expect(input).toHaveAttribute("placeholder", expected);
    });
  });

  describe("Search Button", () => {
    test("should render without crashing", () => {
      const { queryByTestId } = Render_SUT();
      const expected = queryByTestId("search-button");
      expect(expected).toBeInTheDocument();
    });

    test("should render with a magnifying glass icon", () => {
      const { queryByTestId } = Render_SUT();
      const expected = queryByTestId("search-button")?.firstChild;
      expect(expected).toBeTypeOf(typeof (<FaMagnifyingGlass />));
    });

    test("doesn't make an api call if search text empty when clicked", () =>
      new Promise<void>((done) => {
        const { queryByTestId } = Render_SUT();
        queryByTestId("search-button")?.click();

        setTimeout(() => {
          expect(
            MonitorAPI.callHistory[MockApiUrl.GetByCardName]
          ).toBeUndefined();
          done();
        }, 100);
      }));

    test("makes an api call if search text valid when clicked", () =>
      new Promise<void>((done) => {
        const { queryByTestId } = Render_SUT(MockData.CardName_BlackLotus);
        queryByTestId("search-button")?.click();
        const expected = queryByTestId("search-label");
        setTimeout(() => {
          expect(MonitorAPI.callHistory[MockApiUrl.GetByCardName]).toHaveLength(
            1
          );
          expect(expected).toHaveTextContent("1 of 1");
          done();
        }, 100);
      }));

    test("displays blank message on render", () =>
      new Promise<void>((done) => {
        const { queryByTestId } = Render_SUT();
        const expected = queryByTestId("search-label");
        setTimeout(() => {
          expect(expected).toHaveTextContent("");
          done();
        }, 100);
      }));

    test("displays message with card count and current viewing index", () =>
      new Promise<void>((done) => {
        const { queryByTestId } = Render_SUT(MockData.CardName_BlackLotus);
        queryByTestId("search-button")?.click();
        const expected = queryByTestId("search-label");
        setTimeout(() => {
          expect(expected).toHaveTextContent("1 of 1");
          done();
        }, 100);
      }));

    test("displays message if card search returned no matches", () =>
      new Promise<void>((done) => {
        const { queryByTestId } = Render_SUT("InvalidCardName");
        queryByTestId("search-button")?.click();
        const expected = queryByTestId("search-label");
        setTimeout(() => {
          expect(expected).toHaveTextContent("No matching cards found.");
          done();
        }, 100);
      }));

    test("displays message if card search failed", () =>
      new Promise<void>((done) => {
        const { queryByTestId } = Render_SUT(MockData.NetworkError);
        queryByTestId("search-button")?.click();
        const expected = queryByTestId("search-label");
        setTimeout(() => {
          expect(expected).toHaveTextContent("Error fetching data.");
          done();
        }, 100);
      }));
  });
});
