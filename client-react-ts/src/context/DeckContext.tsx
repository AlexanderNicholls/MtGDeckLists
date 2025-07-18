import { createContext, useState } from "react";
import type Deck from "../models/Deck";
import { CardProvider } from "./CardContext";

interface MyContextProps {
  children: React.ReactNode;
  value?: {
    decks?: Deck[];
  };
}

export interface DeckContextProps {
  decks: Deck[];
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
  selectedDeck: Deck;
  setSelectedDeck: React.Dispatch<React.SetStateAction<Deck>>;
}

export const InitializeContext = (
  decks: [],
  setDecks: () => {},
  selectedDeck: Deck,
  setSelectedDeck: () => {}
) =>
  createContext<DeckContextProps>({
    decks: decks,
    setDecks: setDecks,
    selectedDeck: selectedDeck,
    setSelectedDeck: setSelectedDeck,
  });

const DeckContext = createContext<DeckContextProps>({
  decks: [],
  setDecks: () => {},
  selectedDeck: {} as Deck,
  setSelectedDeck: () => {},
});

export const DeckProvider: React.FC<MyContextProps> = ({ children, value }) => {
  const [decks, setDecks] = useState<Deck[]>(value?.decks || []);
  const [selectedDeck, setSelectedDeck] = useState<Deck>({} as Deck);

  return (
    <DeckContext.Provider
      value={{
        decks,
        setDecks,
        selectedDeck,
        setSelectedDeck,
      }}
    >
      <CardProvider>{children}</CardProvider>
    </DeckContext.Provider>
  );
};

export default DeckContext;
