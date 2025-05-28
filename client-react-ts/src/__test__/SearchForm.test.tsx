import { expect, test, describe } from "vitest";
import { render, waitFor } from "@testing-library/react";
import SearchForm from "../components/SearchForm";
import { URIs, Logs } from "../__test__/__mocks__/MockApi";
import MockData from "../__test__/__mocks__/MockData";
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

    test("doesn't make an api call if search text empty when clicked", async () => {
      const { queryByTestId } = Render_SUT();
      queryByTestId("search-button")?.click();

      await waitFor(() => {
        expect(Logs.CallHistory[URIs.GetByCardName]).toBeUndefined();
      });
    });

    test("makes an api call if search text valid when clicked", async () => {
      const { queryByTestId } = Render_SUT(MockData.CardName_BlackLotus);
      queryByTestId("search-button")?.click();
      const expected = queryByTestId("search-label");

      await waitFor(() => {
        expect(Logs.CallHistory[URIs.GetByCardName]).toHaveLength(1);
        expect(expected).toHaveTextContent("1 of 1");
      });
    });

    test("displays blank message on render", async () => {
      const { queryByTestId } = Render_SUT();
      const expected = queryByTestId("search-label");
      await waitFor(() => {
        expect(expected).toHaveTextContent("");
      });
    });

    test("displays message with card count and current viewing index", async () => {
      const { queryByTestId } = Render_SUT(MockData.CardName_BlackLotus);
      queryByTestId("search-button")?.click();
      const expected = queryByTestId("search-label");
      await waitFor(() => {
        expect(expected).toHaveTextContent("1 of 1");
      });
    });

    test("displays message if card search returned no matches", async () => {
      const { queryByTestId } = Render_SUT("InvalidCardName");
      queryByTestId("search-button")?.click();
      const expected = queryByTestId("search-label");
      await waitFor(() => {
        expect(expected).toHaveTextContent("No matching cards found.");
      });
    });

    test("displays message if card search failed", async () => {
      const { queryByTestId } = Render_SUT(MockData.NetworkError);
      queryByTestId("search-button")?.click();
      const expected = queryByTestId("search-label");
      await waitFor(() => {
        expect(expected).toHaveTextContent("Error fetching data.");
      });
    });
  });
});
