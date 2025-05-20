import { expect, test, describe, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import SearchForm from "../components/SearchForm";
import axios from "axios";
import { MockApiUrl, MockData, MonitorAPI } from "../msw/handlers";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Render_SUT = (cardName: string = "") =>
  render(
    <SearchForm
      cards={[]}
      setCards={() => {}}
      index={0}
      setIndex={() => {}}
      initialSearch={cardName}
    />
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

        setTimeout(() => {
          expect(MonitorAPI.callHistory[MockApiUrl.GetByCardName]).toHaveLength(
            1
          );
          done();
        }, 100);
      }));
  });
});
