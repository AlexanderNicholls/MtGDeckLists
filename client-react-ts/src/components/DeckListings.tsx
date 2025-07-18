import { useContext, useEffect } from "react";
import type Deck from "../models/Deck";
import DeckListing from "./DeckListing";
import { getDecks } from "../api";
import DeckContext from "../context/DeckContext";
import "../styles/DeckPanel.css";
import "../styles/DeckListings.css";

interface DeckListingsProps {
  handleDelete: (deck: Deck) => void;
}

const DeckListings: React.FC<DeckListingsProps> = ({ handleDelete }) => {
  const { decks, setDecks, setSelectedDeck } = useContext(DeckContext);

  useEffect(() => {
    try {
      const fetchDecks = async () => {
        const result = await getDecks();
        setDecks(result);
      };
      fetchDecks();
    } catch (err) {
      console.log(`Error fetching data, ${err}`);
    }
  }, []);

  const handleEdit: (deck: Deck) => void = (deck: Deck) =>
    setSelectedDeck(deck);

  return (
    <section className="deck-panel" aria-label="deck listings section">
      <h1 className="deck-listings-heading" aria-label="deck listings heading">
        Deck Listings:
      </h1>
      <section className="deck-panel-container">
        <table className="deck-listings-table" aria-label="deck listings">
          <tbody
            className="deck-listings-body"
            aria-label="deck listings content"
          >
            {decks
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((deck) => (
                <DeckListing
                  key={deck.id}
                  deck={deck}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
          </tbody>
        </table>
      </section>
      <button
        className="deck-listings_create-deck"
        aria-label="Create Deck"
        onClick={() => setSelectedDeck({ id: -1, name: "", cards: [] } as Deck)}
      >
        Create New Deck
      </button>
    </section>
  );
};

export default DeckListings;
