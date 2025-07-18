import { useContext, useEffect, useState } from "react";
import CardSelector from "./CardSelector";
import { Card } from "../models/Card";
import CardContext from "../context/CardContext";
import DeckContext from "../context/DeckContext";
import DataContext from "../context/DataContext";
import "../styles/CardGallery.css";

const CardGallery: React.FC = () => {
  const { cards, setCards, index, setIndex } = useContext(CardContext);
  const { selectedDeck, setSelectedDeck } = useContext(DeckContext);
  const { setMessage } = useContext(DataContext);

  const [isPrintingSelectorOpen, setIsPrintingSelectorOpen] = useState(false);
  const [printingsIndex, setPrintingsIndex] = useState(0);

  useEffect(() => {
    if (cards.length) {
      if (index > cards.length - 1 || index < 0) setIndex(0);
      setMessage(`${index + 1} of ${cards.length}`);
    }
  }, [index, cards.length]);

  const handleSelectCard = () => {
    setSelectedDeck({
      ...selectedDeck,
      cards: [...selectedDeck.cards, cards[index]],
    });
    closePrintings();
  };

  const handleSelectPrinting = () => {
    setCards((c) =>
      c.map((card: Card) =>
        card.name === c[index].name
          ? { ...card, selectedPrinting: printingsIndex }
          : card
      )
    );
    closePrintings();
  };

  const openPrintings = () => {
    setIsPrintingSelectorOpen(true);
    setPrintingsIndex(cards[index].selectedPrinting);
  };

  const closePrintings = () => {
    setIsPrintingSelectorOpen(false);
    setPrintingsIndex(0);
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
            handleCloseGallery={() => closePrintings()}
            isPrintingsGallery={true}
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
        handleClickPrinting={() =>
          isPrintingSelectorOpen ? closePrintings() : openPrintings()
        }
        handleCloseGallery={() => closePrintings()}
      />
    </section>
  );
};

export default CardGallery;
