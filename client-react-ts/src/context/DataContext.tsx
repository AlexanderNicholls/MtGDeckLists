import { createContext, useState } from "react";

interface MyContextProps {
  children: React.ReactNode;
  value?: {
    search: string;
    cards: string[];
    index: number;
  };
}

export interface DataContextProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  cards: string[];
  setCards: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const InitializeContext = (
  search: "",
  setSearch: () => {},
  cards: [],
  setCards: () => {},
  index: 0,
  setIndex: () => {},
  message: "",
  setMessage: () => {}
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
});

export const DataProvider: React.FC<MyContextProps> = ({ children, value }) => {
  const [search, setSearch] = useState(value?.search || "");
  const [cards, setCards] = useState<string[]>(value?.cards || []);
  const [index, setIndex] = useState(value?.index || 0);
  const [message, setMessage] = useState("");

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
