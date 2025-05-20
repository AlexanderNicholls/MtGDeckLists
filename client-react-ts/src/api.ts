import axios from "axios";

const API_URL = "http://localhost:5000/api";
const GETCARDS = "/GetCards";

const getCardsByName: (cardName: string) => Promise<string[]> = async (
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
    console.error("Error fetching data:", err);
  }
};

export { getCardsByName };
