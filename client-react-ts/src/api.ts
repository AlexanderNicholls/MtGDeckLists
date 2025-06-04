import axios from "axios";
import { Card } from "./models/Card";

const API_URL = "http://localhost:5000/api";
const GETCARDS = "/GetCards";

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

export { getCardsByName };
