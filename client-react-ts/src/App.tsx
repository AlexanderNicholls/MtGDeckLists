import CardGallery from "./components/CardGallery";
import SearchForm from "./components/SearchForm";
import DeckListings from "./components/DeckListings";
import { DataProvider } from "./context/DataContext";
import "./styles/App.css";

function App() {
  return (
    <div className="app" data-testid="root">
      <DataProvider>
        <DeckListings />
        <section className="card-panel">
          <CardGallery />
          <SearchForm />
        </section>
      </DataProvider>
    </div>
  );
}

export default App;
