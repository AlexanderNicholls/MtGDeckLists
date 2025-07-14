import CardGallery from "./components/CardGallery";
import SearchForm from "./components/SearchForm";
import DeckListings from "./components/DeckListings";
import DataContext from "./context/DataContext";
import "./styles/App.css";
import { useContext } from "react";
import DeckContents from "./components/DeckContents";
import type Deck from "./models/Deck";

function App() {
  const { selectedDeck, setSelectedDeck } = useContext(DataContext);

  const handleSave: (deck: Deck) => void = async (deck: Deck) => {
    try {
      setSelectedDeck({} as Deck);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app" data-testid="root">
      {selectedDeck?.id ? (
        <DeckContents handleSave={handleSave} />
      ) : (
        <DeckListings />
      )}
      {selectedDeck?.id && (
        <section className="card-panel">
          <CardGallery />
          <SearchForm />
        </section>
      )}
    </div>
  );
}

export default App;
