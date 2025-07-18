import React, { useContext } from "react";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import "../styles/CardListing.css";
import type { Card } from "../models/Card";
import CardContext from "../context/CardContext";

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
  const { viewCard } = useContext(CardContext);
  return (
    <tr className="card-listing" aria-label="card listing">
      <td className="card-listing-main" aria-label="card entry">
        <label
          className="card-listing-name"
          aria-label="card name"
          onClick={() => viewCard(card)}
        >
          {card.name.length > 17 ? `${card.name.slice(0, 14)}...` : card.name}
        </label>
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
