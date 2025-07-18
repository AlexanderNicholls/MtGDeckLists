import CardGallery from "./components/CardGallery";
import SearchForm from "./components/SearchForm";
import DeckListings from "./components/DeckListings";
import "./styles/App.css";
import { useContext } from "react";
import { deleteDeck, saveDeck } from "./api";
import DeckContents from "./components/DeckContents";
import type Deck from "./models/Deck";
import DeckContext from "./context/DeckContext";

function App() {
  const { selectedDeck, setSelectedDeck, decks, setDecks } =
    useContext(DeckContext);

  const handleSave: (deck: Deck) => void = async (deck: Deck) => {
    try {
      await saveDeck(deck);
      setSelectedDeck({} as Deck);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete: (deck: Deck) => void = async (deck: Deck) => {
    try {
      const isSuccess = await deleteDeck(deck);
      if (isSuccess) {
        setDecks(decks.filter((d) => d.id !== deck.id));
        setSelectedDeck({} as Deck);
      }
    } catch (err) {
      console.log(`Error processing delete request, ${err}`);
    }
  };

  return (
    <div className="app" data-testid="root">
      {selectedDeck?.id ? (
        <DeckContents handleSave={handleSave} handleDelete={handleDelete} />
      ) : (
        <DeckListings handleDelete={handleDelete} />
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
