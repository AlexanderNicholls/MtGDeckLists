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
    if (result.length === 0) {
      setMessage("No matching cards found.");
    } else {
      setMessage(`${index + 1} of ${result.length}`);
      setCards(result);
    }
    setIndex(0);
  };

  return (
    <form
      className="search-form"
      onSubmit={(e) => e.preventDefault()}
      data-testid="search-form"
    >
      <input
        className="search-card-name"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter a Card Name..."
        data-testid="search-input"
        autoFocus
      />
      <button
        type="submit"
        className="search-button"
        onClick={() => handleSearch(search)}
        data-testid="search-button"
      >
        <FaMagnifyingGlass />
      </button>
      <label className="search-label" data-testid="search-label">
        {message}
      </label>
    </form>
  );
};

export default SearchForm;
