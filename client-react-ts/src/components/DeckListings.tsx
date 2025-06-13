import { useContext, useEffect } from "react";
import type Deck from "../models/Deck";
import DeckListing from "./DeckListing";
import { deleteDeck, getDecks } from "../api";
import "../styles/DeckListings.css";
import DataContext from "../context/DataContext";

const DeckListings = () => {
  const { decks, setDecks } = useContext(DataContext);

  useEffect(() => {
    try {
      const fetchDecks = async () => {
        const result = await getDecks();
        setDecks(result);
      };
      fetchDecks();
    } catch (err) {
      console.error(`Error fetching data, ${err}`);
    }
  }, []);

  const handleDelete: (deck: Deck) => void = async (deck: Deck) => {
    try {
      const isSuccess = await deleteDeck(deck);
      if (isSuccess) setDecks(decks.filter((d) => d.id !== deck.id));
    } catch (err) {
      console.log(`Error processing delete request, ${err}`);
    }
  };

  return (
    <section className="deck-listings" aria-label="deck listings section">
      <h1 className="deck-listings-heading" aria-label="deck listings heading">
        Deck Listings:
      </h1>
      <table className="deck-listings-table" aria-label="deck listings">
        <tbody
          className="deck-listings-body"
          aria-label="deck listings content"
        >
          {decks?.map((deck) => (
            <DeckListing
              key={deck.id}
              deck={deck}
              handleEdit={() => {}}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default DeckListings;
