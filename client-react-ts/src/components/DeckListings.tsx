import { useContext, useEffect } from "react";
import type Deck from "../models/Deck";
import DeckListing from "./DeckListing";
import { deleteDeck, getDecks } from "../api";
import "../styles/DeckPanel.css";
import DataContext from "../context/DataContext";

const DeckListings = () => {
  const { decks, setDecks, setSelectedDeck } = useContext(DataContext);

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

  const handleDelete: (deck: Deck) => void = async (deck: Deck) => {
    try {
      const isSuccess = await deleteDeck(deck);
      if (isSuccess) setDecks(decks.filter((d) => d.id !== deck.id));
    } catch (err) {
      console.log(`Error processing delete request, ${err}`);
    }
  };

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
    </section>
  );
};

export default DeckListings;
