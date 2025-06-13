import { createContext, useState } from "react";
import { Card } from "../models/Card";
import type Deck from "../models/Deck";

interface MyContextProps {
  children: React.ReactNode;
  value?: {
    search?: string;
    cards?: Card[];
    index?: number;
    decks?: Deck[];
  };
}

export interface DataContextProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  decks: Deck[];
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
}

export const InitializeContext = (
  search: "",
  setSearch: () => {},
  cards: [],
  setCards: () => {},
  index: 0,
  setIndex: () => {},
  message: "",
  setMessage: () => {},
  decks: [],
  setDecks: () => {}
) =>
  createContext<DataContextProps>({
    search: search,
    setSearch: setSearch,
    cards: cards,
    setCards: setCards,
    index: index,
    setIndex: setIndex,
    message: message,
    setMessage: setMessage,
    decks: decks,
    setDecks: setDecks,
  });

const DataContext = createContext<DataContextProps>({
  search: "",
  setSearch: () => {},
  cards: [],
  setCards: () => {},
  index: 0,
  setIndex: () => {},
  message: "",
  setMessage: () => {},
  decks: [],
  setDecks: () => {},
});

export const DataProvider: React.FC<MyContextProps> = ({ children, value }) => {
  const [search, setSearch] = useState(value?.search || "");
  const [cards, setCards] = useState<Card[]>(value?.cards || []);
  const [index, setIndex] = useState(value?.index || 0);
  const [message, setMessage] = useState("");
  const [decks, setDecks] = useState<Deck[]>(value?.decks || []);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        cards,
        setCards,
        index,
        setIndex,
        message,
        setMessage,
        decks,
        setDecks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
