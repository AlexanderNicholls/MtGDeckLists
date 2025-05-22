import { useState } from "react";
import "./styles/App.css";
import CardGallery from "./components/CardGallery";
import SearchForm from "./components/SearchForm";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App" data-testid="root">
      <DataProvider>
        <CardGallery />
        <SearchForm />
      </DataProvider>
    </div>
  );
}

export default App;
