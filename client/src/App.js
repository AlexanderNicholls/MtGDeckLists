import { useState } from "react";
import "./App.css";
import CardGallery from "./components/CardGallery";
import SearchForm from "./components/SearchForm";

function App() {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);

  return (
    <div className="App">
      <CardGallery cards={cards} index={index} setIndex={setIndex} />
      <SearchForm
        cards={cards}
        setCards={setCards}
        index={index}
        setIndex={setIndex}
      />
    </div>
  );
}

export default App;
