import { Printing } from "../models/Card";
import CloseButton from "./UIControls/CloseButton";
import RightArrow from "./UIControls/RightArrow";
import LeftArrow from "./UIControls/LeftArrow";
import CardContainer from "./CardElements/CardContainer";
import "../styles/CardSelector.css";

interface CardSelectorProps {
  cardSelection: Printing[];
  selectionIndex: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  handleSelection: () => void;
  handleClickPrinting?: () => void;
  handleCloseGallery: () => void;
  isPrintingsGallery?: boolean;
}

const CardSelector: React.FC<CardSelectorProps> = ({
  cardSelection,
  selectionIndex,
  setIndex,
  handleSelection,
  handleClickPrinting,
  handleCloseGallery,
  isPrintingsGallery = false,
}) => {
  const handlePrev = () => {
    if (selectionIndex > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (cardSelection.length > 0 && selectionIndex < cardSelection.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section className="card-selector" aria-label="card selector">
      <LeftArrow index={selectionIndex} handleClick={handlePrev} />
      <CardContainer
        position={-1}
        cardSelection={cardSelection}
        index={selectionIndex}
        handleClick={handlePrev}
        isPrintingsGallery={isPrintingsGallery}
      />
      <CardContainer
        position={0}
        cardSelection={cardSelection}
        index={selectionIndex}
        handleClick={handleSelection}
        handleClickPrinting={handleClickPrinting}
        isPrintingsGallery={isPrintingsGallery}
      />
      <CardContainer
        position={1}
        cardSelection={cardSelection}
        index={selectionIndex}
        handleClick={handleNext}
        isPrintingsGallery={isPrintingsGallery}
      />
      <RightArrow
        selection={cardSelection}
        index={selectionIndex}
        handleClick={handleNext}
      />
      {isPrintingsGallery && <CloseButton handleClick={handleCloseGallery} />}
    </section>
  );
};

export default CardSelector;
