import type { Card } from "./Card";

class Deck {
  id: number;
  name: string;
  cards: Card[];

  constructor(id: number, name: string, cards: Card[]) {
    this.id = id;
    this.name = name;
    this.cards = cards;
  }
}

export default Deck;
