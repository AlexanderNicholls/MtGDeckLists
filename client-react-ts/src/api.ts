import axios from "axios";
import { Card } from "./models/Card";
import type Deck from "./models/Deck";

const API_URL = "http://localhost:5000/api";
const GETCARDS = "/GetCards";
const GETDECKS = "/GetDecks";
const DELETEDECK = "/DeleteDeck";

const getCardsByName: (cardName: string) => Promise<Card[]> = async (
  cardName
) => {
  try {
    const response = await axios.get(`${API_URL}${GETCARDS}`, {
      params: {
        cardName: cardName,
      },
    });
    return response.data;
  } catch (err) {
    return undefined;
  }
};

const getDecks: () => Promise<Deck[]> = async () => {
  try {
    const response = await axios.get(`${API_URL}${GETDECKS}`);
    return response.data;
  } catch (err) {
    return undefined;
  }
};

const deleteDeck: (deck: Deck) => Promise<boolean> = async (deck: Deck) => {
  try {
    const response = await axios.delete(`${API_URL}${DELETEDECK}`, {
      params: {
        id: deck.id,
      },
    });
    return response.status === 200;
  } catch (err) {
    return false;
  }
};

export { getCardsByName, getDecks, deleteDeck };
