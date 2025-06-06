const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(cors());
app.use(express.json());

const MTGIO_URL_NAME = "http://api.magicthegathering.io/v1/cards?name=";

app.get("/api/GetCards", async (req, res) => {
  try {
    if (!req.query.cardName || req.query.cardName.trim() === "") {
      return res.status(204).json({ data: [] });
    }
    const response = (
      await axios.get(MTGIO_URL_NAME, {
        params: {
          name: req.query.cardName,
        },
      })
    ).data.cards.filter((card) => card.imageUrl);
    const uniqueCardGroups = response.reduce((acc, card) => {
      let foundIndex;
      const found = acc.some((c, i) => {
        foundIndex = i;
        return c.name === card.name;
      });
      if (found) {
        acc[foundIndex].printings.push({
          imageUrl: card.imageUrl,
          multiverseid: card.multiverseid,
        });
        acc[foundIndex].printings.sort(
          (a, b) => a.multiverseid - b.multiverseid
        );
      } else {
        acc.push({
          name: card.name,
          selectedPrinting: 0,
          printings: [
            { imageUrl: card.imageUrl, multiverseid: card.multiverseid },
          ],
        });
        acc.sort((a, b) => a.name.localeCompare(b.name));
      }
      return acc;
    }, []);
    res.json(uniqueCardGroups);
  } catch (err) {
    res.status(500).json({ error: `Error fetching data, ${err.message}` });
  }
});

module.exports = app;
