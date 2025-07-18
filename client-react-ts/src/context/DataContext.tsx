import { createContext, useState } from "react";

interface MyContextProps {
  children: React.ReactNode;
}

export interface DataContextProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const InitializeContext = (message: "", setMessage: () => {}) =>
  createContext<DataContextProps>({
    message: message,
    setMessage: setMessage,
  });

const DataContext = createContext<DataContextProps>({
  message: "",
  setMessage: () => {},
});

export const DataProvider: React.FC<MyContextProps> = ({ children }) => {
  const [message, setMessage] = useState("");

  return (
    <DataContext.Provider
      value={{
        message,
        setMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
