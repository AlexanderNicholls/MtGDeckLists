import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

interface CardGalleryProps {
  cards: string[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CardGallery: React.FC<CardGalleryProps> = ({
  cards,
  index,
  setIndex,
}) => {
  if (index > cards.length - 1 || index < 0) setIndex(0);

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (cards.length > 0 && index < cards.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="card-gallery" data-testid="card-gallery">
      <button
        className={`arrow-left ${index === 0 ? "disabled" : ""}`}
        onClick={() => handlePrev()}
        data-testid="arrow-left"
      >
        <FaAngleLeft />
      </button>
      {index > 0 && cards.length > 1 && (
        <img
          className="card-image-prev"
          src={cards[index - 1]}
          onClick={() => handlePrev()}
          data-testid="card-image-prev"
        />
      )}
      <img
        className="card-image-current"
        src={
          cards.length > 0
            ? cards[index]
            : "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=-1&type=card"
        }
        data-testid="card-image-current"
      />
      {index < cards.length - 1 && (
        <img
          className="card-image-next"
          src={cards[index + 1]}
          onClick={() => handleNext()}
          data-testid="card-image-next"
        />
      )}
      <button
        className={`arrow-right
          ${
            cards.length === 0 || index === cards.length - 1 ? "disabled" : ""
          }`}
        onClick={() => handleNext()}
        data-testid="arrow-right"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default CardGallery;
