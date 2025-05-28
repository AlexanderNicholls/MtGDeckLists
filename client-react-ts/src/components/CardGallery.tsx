import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import "../styles/CardGallery.css";
import DataContext from "../context/DataContext";
import { useContext, useEffect } from "react";

const CardGallery: React.FC = () => {
  const { cards, index, setIndex, setMessage } = useContext(DataContext);

  useEffect(() => {
    if (index > cards.length - 1 || index < 0) setIndex(0);
  }, [index, cards.length]);

  const handlePrev = () => {
    if (index > 0) {
      setMessage(`${index} of ${cards.length}`);
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (cards.length > 0 && index < cards.length - 1) {
      setMessage(`${index + 2} of ${cards.length}`);
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section className="card-gallery" aria-label="card gallery">
      <button
        className={`arrow-left ${index === 0 ? "disabled" : ""}`}
        onClick={() => handlePrev()}
        aria-label="previous arrow button"
      >
        <FaAngleLeft />
      </button>
      {index > 0 && cards.length > 1 && (
        <img
          className="card-image-prev"
          src={cards[index - 1]}
          onClick={() => handlePrev()}
          aria-label="previous card image"
        />
      )}
      <img
        className="card-image-current"
        src={
          cards.length > 0
            ? cards[index]
            : "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=-1&type=card"
        }
        aria-label="current card image"
      />
      {index < cards.length - 1 && (
        <img
          className="card-image-next"
          src={cards[index + 1]}
          onClick={() => handleNext()}
          aria-label="next card image"
        />
      )}
      <button
        className={`arrow-right
          ${
            cards.length === 0 || index === cards.length - 1 ? "disabled" : ""
          }`}
        onClick={() => handleNext()}
        aria-label="next arrow button"
      >
        <FaAngleRight />
      </button>
    </section>
  );
};

export default CardGallery;
