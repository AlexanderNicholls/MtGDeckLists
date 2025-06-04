import { Printing } from "../models/Card";
import CloseButton from "./UIControls/CloseButton";
import RightArrow from "./UIControls/RightArrow";
import LeftArrow from "./UIControls/LeftArrow";
import CardContainer from "./CardElements/CardContainer";

interface CardSelectorProps {
  cardSelection: Printing[];
  selectionIndex: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  handleSelection: () => void;
  handleCloseGallery: () => void;
  isPrintingGallery?: boolean;
}

const CardSelector: React.FC<CardSelectorProps> = ({
  cardSelection,
  selectionIndex,
  setIndex,
  handleSelection,
  handleCloseGallery,
  isPrintingGallery = false,
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
    <>
      <LeftArrow index={selectionIndex} handleClick={handlePrev} />
      <CardContainer
        position={-1}
        cardSelection={cardSelection}
        index={selectionIndex}
        handleClick={handlePrev}
        isPrintingGallery={isPrintingGallery}
      />
      <CardContainer
        position={0}
        cardSelection={cardSelection}
        index={selectionIndex}
        handleClick={handleSelection}
        isPrintingGallery={isPrintingGallery}
      />
      <CardContainer
        position={1}
        cardSelection={cardSelection}
        index={selectionIndex}
        handleClick={handleNext}
        isPrintingGallery={isPrintingGallery}
      />
      <RightArrow
        selection={cardSelection}
        index={selectionIndex}
        handleClick={handleNext}
      />
      {isPrintingGallery && <CloseButton handleClick={handleCloseGallery} />}
    </>
  );
};

export default CardSelector;
