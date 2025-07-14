import React from "react";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import "../styles/CardListing.css";
import type { Card } from "../models/Card";

interface CardListingProps {
  card: Card;
  handleAdd: (card: Card) => void;
  handleDelete: (card: Card) => void;
}

const CardListing: React.FC<CardListingProps> = ({
  card,
  handleAdd,
  handleDelete,
}) => {
  return (
    <tr className="card-listing" aria-label="card listing">
      <td className="card-listing-name" aria-label="card name">
        {card.name.length > 13 ? `${card.name.slice(0, 10)}...` : card.name}
        <section className="card-listing-controls">
          <button
            className="card-listing-btn edit-btn"
            aria-label="edit card button"
            onClick={() => handleAdd(card)}
          >
            <FaPlus />
          </button>
          <button
            className="card-listing-btn delete-btn"
            aria-label="delete card button"
            onClick={() => handleDelete(card)}
          >
            <FaTrashCan />
          </button>
        </section>
      </td>
    </tr>
  );
};

export default CardListing;
