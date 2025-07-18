import { expect, test, describe } from "vitest";
import { render, waitFor } from "@testing-library/react";
import SearchForm from "../components/SearchForm";
import { URIs, Logs } from "../__test__/__mocks__/MockApi";
import MockData from "../__test__/__mocks__/MockData";
import { DataProvider } from "../context/DataContext";
import { CardProvider } from "../context/CardContext";

const searchForm = "search form";
const searchInput = "search input";
const searchButton = "search button";

const Render_SUT = (cardName: string = "") =>
  render(
    <DataProvider>
      <CardProvider>
        <SearchForm initialSearch={cardName} />
      </CardProvider>
    </DataProvider>
  );

describe("SearchForm component", () => {
  test("should render without crashing", () => {
    const { getByRole } = Render_SUT();
    const expected = getByRole("form", { name: searchForm });
    expect(expected).toBeInTheDocument();
  });

  describe("should render an input text box", () => {
    test("without crashing", () => {
      const { getByRole } = Render_SUT();
      const expected = getByRole("textbox", { name: searchInput });
      expect(expected).toBeInTheDocument();
    });

    test("with correct placeholder text", () => {
      const { getByPlaceholderText } = Render_SUT();
      expect(getByPlaceholderText("Enter a Card Name...")).toBeInTheDocument();
    });
  });

  describe("Search Button", () => {
    test("should render without crashing", () => {
      const { getByRole } = Render_SUT();
      const expected = getByRole("button", { name: searchButton });
      expect(expected).toBeInTheDocument();
    });

    test("should render with a magnifying glass icon", () => {
      const { getByTitle } = Render_SUT();
      const expected = getByTitle("search");
      expect(expected).toBeInTheDocument();
    });

    test("doesn't make an api call if search text empty when clicked", async () => {
      const { getByRole } = Render_SUT();
      getByRole("button", { name: searchButton })?.click();

      await waitFor(() => {
        expect(Logs.CallHistory[URIs.GetByCardName]).toBeUndefined();
      });
    });

    test("makes an api call if search text valid when clicked", async () => {
      const { getByRole, getByText } = Render_SUT(MockData.BlackLotus.name);
      getByRole("button", { name: searchButton })?.click();

      await waitFor(() => {
        expect(Logs.CallHistory[URIs.GetByCardName]).toHaveLength(1);
      });
    });

    test("displays blank message on render", async () => {
      const { getByLabelText } = Render_SUT();
      const expected = getByLabelText("");
      await waitFor(() => {
        expect(expected).toHaveTextContent("");
      });
    });

    test("displays message with card count and current viewing index", async () => {
      const { getByRole, getByLabelText } = Render_SUT(
        MockData.BlackLotus.name
      );
      getByRole("button", { name: searchButton })?.click();
      await waitFor(() => {
        expect(getByLabelText("1 of 1")).toBeInTheDocument();
      });
    });

    test("displays message if card search returned no matches", async () => {
      const { getByRole, getByLabelText } = Render_SUT("InvalidCardName");
      getByRole("button", { name: searchButton })?.click();
      await waitFor(() => {
        expect(getByLabelText("No matching cards found.")).toBeInTheDocument();
      });
    });

    test("displays message if card search failed", async () => {
      const { getByRole, getByLabelText } = Render_SUT(MockData.NetworkError);
      getByRole("button", { name: searchButton })?.click();
      await waitFor(() => {
        expect(getByLabelText("Error fetching data.")).toBeInTheDocument();
      });
    });
  });
});
