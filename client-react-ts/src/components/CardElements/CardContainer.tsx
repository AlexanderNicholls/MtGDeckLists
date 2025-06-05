import React from "react";
import type { Printing } from "../../models/Card";
import PrintingsIcon from "./PrintingsIcon";
import "../../styles/CardContainer.css";

interface CardContainerProps {
  position: number;
  index: number;
  cardSelection: Printing[];
  handleClick: () => void;
  isPrintingGallery: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({
  position,
  index,
  cardSelection,
  handleClick,
  isPrintingGallery,
}) => {
  const getPositionLabel = () => {
    switch (position) {
      case -1:
        return "previous";
      case 0:
        return "current";
      default:
        return "next";
    }
  };

  const isVisible = () => {
    switch (position) {
      case -1:
        return index > 0 && cardSelection.length > 1;
      case 1:
        return index < cardSelection.length - 1;
      default:
        return true;
    }
  };

  return (
    <>
      <section
        className={`card-image-container card-${getPositionLabel()}`}
        aria-label={`${getPositionLabel()} card`}
      >
        {isVisible() && (
          <>
            <img
              className={`card-image-${getPositionLabel}`}
              src={
                cardSelection[index + position]?.imageUrl ??
                "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=-1&type=card"
              }
              onClick={() => cardSelection.length && handleClick()}
              aria-label={`${getPositionLabel()} card image`}
            />
            <PrintingsIcon
              showPrintingsIcon={position === 0 && !isPrintingGallery}
            />
          </>
        )}
      </section>
    </>
  );
};

export default CardContainer;
