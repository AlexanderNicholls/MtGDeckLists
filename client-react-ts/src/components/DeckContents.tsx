import { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import type { Card } from "../models/Card";
import CardListing from "./CardListing";
import "../styles/DeckPanel.css";
import type Deck from "../models/Deck";

interface DeckContentsProps {
  handleSave: (deck: Deck) => void;
}

const DeckContents: React.FC<DeckContentsProps> = ({ handleSave }) => {
  const { selectedDeck } = useContext(DataContext);

  useEffect(() => {}, []);

  const handleDelete: (card: Card) => void = async (card: Card) => {};

  return (
    <section className="deck-panel" aria-label="deck contents section">
      <h1 className="deck-contents-heading" aria-label="deck contents heading">
        Deck Contents:
      </h1>
      <section className="deck-panel-container">
        <table className="deck-contents-table" aria-label="deck contents">
          <tbody className="deck-contents-body" aria-label="deck content">
            {selectedDeck.cards?.map((card: Card, index: number) => (
              <CardListing
                key={index}
                card={card}
                handleAdd={() => {}}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </section>
      <button
        className="deck-contents-save"
        aria-label="save deck button"
        onClick={() => handleSave(selectedDeck)}
      >
        Save
      </button>
    </section>
  );
};

export default DeckContents;
