import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { getCardsByName } from "../api";

const SearchForm = ({ cards, setCards, index, setIndex }) => {
  const [search, setSearch] = useState("");

  const handleSearch = async (cardName) => {
    const cards = await getCardsByName(cardName);
    setCards(cards);
    setIndex(0);
  };

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search-card-name"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter a Card Name..."
      />
      <button
        type="submit"
        className="search-button"
        onClick={(e) => handleSearch(search)}
      >
        <FaMagnifyingGlass className="search-icon" />
      </button>
      <label className="search-count">
        {cards.length > 0 ? `${index + 1} of ${cards.length}` : ""}
      </label>
    </form>
  );
};

export default SearchForm;
