import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getCardsByName: (cardName: string) => Promise<[string]> = async (
  cardName
) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        cardName: cardName,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

export { getCardsByName };
