import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { getCardsByName } from "../api.ts";

interface SearchFormProps {
  initialSearch: string;
  cards: string[];
  setCards: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SearchForm: React.FC<SearchFormProps> = ({
  initialSearch = "",
  cards,
  setCards,
  index,
  setIndex,
}) => {
  const [search, setSearch] = useState(initialSearch);

  const handleSearch = async (cardName: string) => {
    if (!cardName) return;
    const cards = await getCardsByName(cardName);
    setCards(cards);
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
      />
      <button
        type="submit"
        className="search-button"
        onClick={() => handleSearch(search)}
        data-testid="search-button"
      >
        <FaMagnifyingGlass />
      </button>
      <label className="search-count" data-testid="search-count">
        {cards.length > 0 ? `${index + 1} of ${cards.length}` : ""}
      </label>
    </form>
  );
};

export default SearchForm;
