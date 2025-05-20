const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");

app.use(cors());
app.use(express.json());

const MTGIO_URL_NAME = "http://api.magicthegathering.io/v1/cards?name=";

app.get("/api/GetCards", async (req, res) => {
  try {
    const response = await axios.get(MTGIO_URL_NAME, {
      params: {
        name: req.query.cardName,
      },
    });
    res.json(
      response.data.cards
        .filter((card) => card.imageUrl)
        .map((card) => card.imageUrl)
    );
  } catch (err) {
    res.status(500).json({ error: `Error fetching data, ${err.message}` });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
