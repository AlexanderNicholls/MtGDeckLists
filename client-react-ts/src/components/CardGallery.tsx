import DataContext from "../context/DataContext";
import { useContext, useEffect, useState } from "react";
import "../styles/CardGallery.css";
import CardSelector from "./CardSelector";
import { Card } from "../models/Card";

const CardGallery: React.FC = () => {
  const { cards, setCards, index, setIndex, setMessage } =
    useContext(DataContext);
  const [isPrintingSelectorOpen, setIsPrintingSelectorOpen] = useState(false);
  const [printingsIndex, setPrintingsIndex] = useState(0);

  useEffect(() => {
    if (cards.length) {
      if (index > cards.length - 1 || index < 0) setIndex(0);
      setMessage(`${index + 1} of ${cards.length}`);
    }
  }, [index, cards.length]);

  const handleSelectCard = () => {
    setPrintingsIndex(cards[index].selectedPrinting);
    setIsPrintingSelectorOpen(!isPrintingSelectorOpen);
  };

  const handleSelectPrinting = () => {
    setCards((c) =>
      c.map((card: Card) =>
        card.name === c[index].name
          ? { ...card, selectedPrinting: printingsIndex }
          : card
      )
    );
    setIsPrintingSelectorOpen(false);
  };

  return (
    <section className="card-gallery" aria-label="card gallery">
      {isPrintingSelectorOpen && (
        <section
          className="card-gallery-printings"
          aria-label="card printings selector"
        >
          <CardSelector
            cardSelection={cards[index].printings}
            selectionIndex={printingsIndex}
            setIndex={setPrintingsIndex}
            handleSelection={() => handleSelectPrinting()}
            handleCloseGallery={() => setIsPrintingSelectorOpen(false)}
            isPrintingGallery={true}
          />
        </section>
      )}
      <CardSelector
        cardSelection={cards.map(
          (card) => card.printings[card.selectedPrinting]
        )}
        selectionIndex={index}
        setIndex={setIndex}
        handleSelection={() => handleSelectCard()}
        handleCloseGallery={() => setIsPrintingSelectorOpen(false)}
      />
    </section>
  );
};

export default CardGallery;
