import React from "react";
import type Deck from "../models/Deck";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import "../styles/DeckListing.css";

interface DeckListingProps {
  deck: Deck;
  handleEdit: (deck: Deck) => void;
  handleDelete: (deck: Deck) => void;
}

const DeckListing: React.FC<DeckListingProps> = ({
  deck,
  handleEdit,
  handleDelete,
}) => {
  const isDeckValid = () => {
    return deck && deck.id > 0 && deck.name && Array.isArray(deck.cards);
  };

  return (
    <>
      {isDeckValid() && (
        <tr className="deck-listing" aria-label="deck listing">
          <td className="deck-listing-main">
            <label className="deck-listing-name" aria-label="deck name">
              {deck.name.length > 13
                ? `${deck.name.slice(0, 10)}...`
                : deck.name}
            </label>
            <section className="deck-listing-controls">
              <button
                className="deck-listing-btn edit-btn"
                aria-label="edit deck button"
                onClick={() => handleEdit(deck)}
              >
                <FaPencil />
              </button>
              <button
                className="deck-listing-btn delete-btn"
                aria-label="delete deck button"
                onClick={() => handleDelete(deck)}
              >
                <FaTrashCan />
              </button>
            </section>
          </td>
          <td>
            <div className="deck-listing_card-count-bar-base">
              <div
                className="deck-listing_card-count-bar-progress"
                style={{ width: `${(deck.cards.length / 100) * 100}%` }}
              >
                <label
                  className="deck-listing-card-count"
                  aria-label="deck card count"
                >{`${deck.cards.length}/100`}</label>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default DeckListing;
