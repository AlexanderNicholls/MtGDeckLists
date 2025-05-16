import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const CardGallery = ({ cards, index, setIndex }) => {
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
    <div className="card-gallery">
      <FaAngleLeft
        className={`arrow-left ${index === 0 ? "disabled" : ""}`}
        disabled={index === 0 ? true : false}
        onClick={() => handlePrev()}
      />
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
      <FaAngleRight
        className={`arrow-right
          ${
            cards.length === 0 || index === cards.length - 1 ? "disabled" : ""
          }`}
        onClick={() => handleNext()}
      />
    </div>
  );
};

export default CardGallery;
