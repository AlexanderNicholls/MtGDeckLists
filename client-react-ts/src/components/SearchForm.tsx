import { FaMagnifyingGlass } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { getCardsByName } from "../api.ts";
import "../styles/SearchForm.css";
import DataContext from "../context/DataContext.tsx";

interface SearchFormProps {
  initialSearch?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ initialSearch = "" }) => {
  const { search, setSearch, setCards, index, setIndex, message, setMessage } =
    useContext(DataContext);

  useEffect(() => {
    setSearch(initialSearch);
  }, []);

  const handleSearch = async (cardName: string) => {
    if (!cardName) return;
    const result = await getCardsByName(cardName);
    if (result === undefined) {
      setMessage("Error fetching data.");
      return;
    }
    setIndex(0);
    setCards(result);
    if (result.length === 0) {
      setMessage("No matching cards found.");
    } else {
      setMessage(`${index + 1} of ${result.length}`);
    }
  };

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault(), handleSearch(search);
      }}
      aria-label="search form"
    >
      <section className="search-entry">
        <input
          className="search-card-name"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter a Card Name..."
          id="search-input"
          aria-label="search input"
          autoFocus
        />
        <button
          type="submit"
          className="search-button"
          aria-label="search button"
        >
          <FaMagnifyingGlass title="search" />
        </button>
      </section>
      <label
        className="search-label"
        aria-label="search results label"
        htmlFor="search-input"
      >
        {message}
      </label>
    </form>
  );
};

export default SearchForm;
