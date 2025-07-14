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
  return (
    <tr className="deck-listing" aria-label="deck listing">
      <td className="deck-listing-name" aria-label="deck name">
        {deck.name.length > 13 ? `${deck.name.slice(0, 10)}...` : deck.name}
      </td>
      <td className="deck-listing-controls">
        <button
          className="deck-listing-btn deck-listing-edit"
          aria-label="edit deck button"
          onClick={() => handleEdit(deck)}
        >
          <FaPencil />
        </button>
        <button
          className="deck-listing-btn deck-listing-delete"
          aria-label="delete deck button"
          onClick={() => handleDelete(deck)}
        >
          <FaTrashCan />
        </button>
      </td>
    </tr>
  );
};

export default DeckListing;
