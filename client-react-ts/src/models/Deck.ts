import type { Printing } from "./Card";

class Deck {
  id: number;
  name: string;
  cards: Printing[];

  constructor(id: number, name: string, cards: Printing[]) {
    this.id = id;
    this.name = name;
    this.cards = cards;
  }
}

export default Deck;
