import { useContext, useEffect } from "react";
import CardListing from "./CardListing";
import type Deck from "../models/Deck";
import type { Card } from "../models/Card";
import "../styles/DeckPanel.css";
import "../styles/DeckContents.css";
import DeckContext from "../context/DeckContext";

interface DeckContentsProps {
  handleSave: (deck: Deck) => void;
  handleDelete: (deck: Deck) => void;
}

const DeckContents: React.FC<DeckContentsProps> = ({
  handleSave,
  handleDelete,
}) => {
  const { selectedDeck, setSelectedDeck } = useContext(DeckContext);

  useEffect(() => {}, []);

  const deleteCard: (selectedCard: Card) => void = async (
    selectedCard: Card
  ) => {
    let cards = selectedDeck.cards.filter(
      (card) =>
        card.printings[card.selectedPrinting]?.id !==
        selectedCard.printings[selectedCard.selectedPrinting]?.id
    );
    setSelectedDeck({ ...selectedDeck, cards: cards });
  };

  return (
    <section className="deck-panel" aria-label="deck contents section">
      <h1 className="deck-contents-heading" aria-label="deck contents heading">
        Deck Contents:
      </h1>
      <section className="deck-contents-info" aria-label="deck header">
        <input
          className="deck-contents_deck-name"
          aria-label="Deck Name"
          placeholder="Enter Deck Name..."
          value={selectedDeck.name}
          onChange={(e) =>
            setSelectedDeck({ ...selectedDeck, name: e.target.value })
          }
        ></input>
        <label
          className="deck-contents_card-count"
          aria-label="Card Count"
        >{`${selectedDeck.cards?.length}/100`}</label>
      </section>
      <section className="deck-panel-container">
        <table className="deck-contents-table" aria-label="deck contents">
          <tbody className="deck-contents-body" aria-label="deck content">
            {selectedDeck.cards?.map((card: Card, index: number) => (
              <CardListing
                key={index}
                card={card}
                handleAdd={() => {}}
                handleDelete={deleteCard}
              />
            ))}
          </tbody>
        </table>
      </section>
      <section className="deck-contents-controls">
        <button
          className="deck-contents-save"
          aria-label="save deck button"
          onClick={() => handleSave(selectedDeck)}
        >
          Save
        </button>
        <button
          className="deck-contents-delete"
          aria-label="delete deck button"
          onClick={() => handleDelete(selectedDeck)}
        >
          Delete
        </button>
      </section>
    </section>
  );
};

export default DeckContents;
