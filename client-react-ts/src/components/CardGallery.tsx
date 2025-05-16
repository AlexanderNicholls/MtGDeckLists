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
      >
        <FaAngleLeft />
      </button>
      {index > 0 && cards.length > 2 && (
        <img
          className="card-image-prev"
          src={cards[index - 1]}
          onClick={() => handlePrev()}
        />
      )}
      <img
        className="card-image-current"
        src={
          cards.length > 0
            ? cards[index]
            : "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=-1&type=card"
        }
      />
      {index < cards.length - 1 && (
        <img
          className="card-image-next"
          src={cards[index + 1]}
          onClick={() => handleNext()}
        />
      )}
      <button
        className={`arrow-right
          ${
            cards.length === 0 || index === cards.length - 1 ? "disabled" : ""
          }`}
        onClick={() => handleNext()}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default CardGallery;
