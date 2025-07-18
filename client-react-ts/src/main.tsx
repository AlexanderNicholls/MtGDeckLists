import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { DataProvider } from "./context/DataContext.tsx";
import { DeckProvider } from "./context/DeckContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataProvider>
      <DeckProvider>
        <App />
      </DeckProvider>
    </DataProvider>
  </StrictMode>
);
