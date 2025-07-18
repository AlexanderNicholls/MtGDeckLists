import { createContext, useState } from "react";
import { Card } from "../models/Card";

interface MyContextProps {
  children: React.ReactNode;
  value?: {
    search?: string;
    cards?: Card[];
    index?: number;
  };
}

export interface CardContextProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  viewCard: (card: Card) => void;
  printingsIndex: number;
  setPrintingsIndex: React.Dispatch<React.SetStateAction<number>>;
  isPrintingSelectorOpen: boolean;
  setIsPrintingSelectorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InitializeContext = (
  search: "",
  setSearch: () => {},
  cards: [],
  setCards: () => {},
  index: 0,
  setIndex: () => {},
  viewCard: (card: Card) => void,
  printingsIndex: 0,
  setPrintingsIndex: () => {},
  isPrintingSelectorOpen: false,
  setIsPrintingSelectorOpen: () => {}
) =>
  createContext<CardContextProps>({
    search: search,
    setSearch: setSearch,
    cards: cards,
    setCards: setCards,
    index: index,
    setIndex: setIndex,
    viewCard: viewCard,
    printingsIndex: printingsIndex,
    setPrintingsIndex: setPrintingsIndex,
    isPrintingSelectorOpen: isPrintingSelectorOpen,
    setIsPrintingSelectorOpen: setIsPrintingSelectorOpen,
  });

const CardContext = createContext<CardContextProps>({
  search: "",
  setSearch: () => {},
  cards: [],
  setCards: () => {},
  index: 0,
  setIndex: () => {},
  viewCard: () => {},
  printingsIndex: 0,
  setPrintingsIndex: () => {},
  isPrintingSelectorOpen: false,
  setIsPrintingSelectorOpen: () => {},
});

export const CardProvider: React.FC<MyContextProps> = ({ children, value }) => {
  const [search, setSearch] = useState(value?.search || "");
  const [cards, setCards] = useState<Card[]>(value?.cards || []);
  const [index, setIndex] = useState(value?.index || 0);
  const viewCard = (card: Card) => setCards([card]);
  const [printingsIndex, setPrintingsIndex] = useState(0);
  const [isPrintingSelectorOpen, setIsPrintingSelectorOpen] = useState(false);

  return (
    <CardContext.Provider
      value={{
        search,
        setSearch,
        cards,
        setCards,
        index,
        setIndex,
        viewCard,
        printingsIndex,
        setPrintingsIndex,
        isPrintingSelectorOpen,
        setIsPrintingSelectorOpen,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;
