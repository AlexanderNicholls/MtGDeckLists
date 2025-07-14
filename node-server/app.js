const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const fs = require("fs");

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

app.get("/api/GetDecks", async (req, res) => {
  try {
    const fileContent = await fs.readFileSync("./data/db.json", "utf-8");
    const decks = JSON.parse(fileContent);
    res.status(200).json(decks.sort((a, b) => a.id - b.id));
  } catch (err) {
    res.status(500).json({ error: `Error fetching data, ${err.message}` });
  }
});

app.delete("/api/DeleteDeck/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const fileContent = fs.readFileSync("./data/db.json", "utf-8");
    const decks = JSON.parse(fileContent);
    const updatedDecks = decks.filter((deck) => deck.id !== id);
    fs.writeFileSync("./data/db.json", JSON.stringify(updatedDecks), "utf-8");
    res.status(200).json();
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.put("/api/SaveDeck/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateDeck = req.body;
    const fileContent = await fs.readFileSync("./data/db.json", "utf-8");
    const existingDecks = JSON.parse(fileContent);
    const result = existingDecks.map((deck) =>
      deck.id === id ? updateDeck : deck
    );
    if (!result.some((deck) => deck.id === id)) result.push(updateDeck);
    fs.writeFileSync("./data/db.json", JSON.stringify(result), "utf-8");

    res.status(200).json(result);
  } catch (err) {
    console.log(`Error saving deck: ${err.message}`);
    res.status(500).json(err.message);
  }
});

module.exports = app;
