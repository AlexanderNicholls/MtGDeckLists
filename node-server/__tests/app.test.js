const request = require("supertest");
const app = require("../app");
const axios = require("axios");
const fs = require("fs");

jest.mock("axios");
jest.mock("fs");
const MTGIO_URL_NAME = "http://api.magicthegathering.io/v1/cards?name=";

let appServer;

const BlackLotus = "Black Lotus";
const GildedLotus = "Gilded Lotus";
const BlackLotus_Card = {
  name: BlackLotus,
  selectedPrinting: 0,
  printings: [
    {
      imageUrl: `http://example.com/${BlackLotus}.jpg`,
      multiverseid: 1,
    },
    {
      imageUrl: `http://example.com/${BlackLotus}2.jpg`,
      multiverseid: 2,
    },
  ],
};
const GildedLotus_Card = {
  name: GildedLotus,
  selectedPrinting: 0,
  printings: [
    {
      imageUrl: `http://example.com/${GildedLotus}.jpg`,
      multiverseid: 3,
    },
    {
      imageUrl: `http://example.com/${GildedLotus}2.jpg`,
      multiverseid: 4,
    },
  ],
};

const getPrinting = (card, index = 0) => {
  return {
    name: card.name,
    multiverseid: card.printings[index].multiverseid,
    imageUrl: card.printings[index].imageUrl,
  };
};

describe("api/GetDecks", () => {
  beforeAll((done) => {
    appServer = app.listen(0, done);
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  afterAll(() => {
    appServer.close();
  });

  test.only("gets empty list if no decks saved", async () => {
    const mockFile = JSON.stringify([]);
    fs.readFileSync.mockResolvedValue(mockFile);
    const result = await request(app).get("/api/GetDecks");
    const resultObj = JSON.parse(result.text);

    expect(resultObj).toHaveLength(0);
  });

  test("gets list with one deck if one deck saved", async () => {
    const expected = {
      name: "TestDeck",
      cards: [getPrinting(BlackLotus_Card, 0)],
    };
    const mockFile = JSON.stringify({
      decks: [expected],
    });
    fs.readFileSync.mockResolvedValue(mockFile);
    const result = await request(app).get("/api/GetDecks");
    const resultObj = JSON.parse(result.text);

    expect(resultObj).toHaveLength(1);
    expect(resultObj[0]).toEqual(expected);
  });

  test("gets list with two decks if two decks saved", async () => {
    const deck1 = {
      name: "TestDeck",
      cards: [getPrinting(BlackLotus_Card, 0), getPrinting(BlackLotus_Card, 1)],
    };
    const deck2 = {
      name: "TestDeck2",
      cards: [
        getPrinting(GildedLotus_Card, 0),
        getPrinting(GildedLotus_Card, 1),
      ],
    };
    const mockFile = JSON.stringify({
      decks: [deck1, deck2],
    });
    fs.readFileSync.mockResolvedValue(mockFile);
    const result = await request(app).get("/api/GetDecks");
    const resultObj = JSON.parse(result.text);

    expect(resultObj).toHaveLength(2);
    expect(resultObj[0]).toEqual(deck1);
    expect(resultObj[1]).toEqual(deck2);
  });

  test("gets deck list sorted alphabetically by deck name", async () => {
    const deck1 = {
      name: "TestDeck",
      cards: [getPrinting(BlackLotus_Card, 0), getPrinting(BlackLotus_Card, 1)],
    };
    const deck2 = {
      name: "TestDeck2",
      cards: [
        getPrinting(GildedLotus_Card, 0),
        getPrinting(GildedLotus_Card, 1),
      ],
    };
    const mockFile = JSON.stringify({
      decks: [deck2, deck1],
    });
    fs.readFileSync.mockResolvedValue(mockFile);
    const result = await request(app).get("/api/GetDecks");
    const resultObj = JSON.parse(result.text);

    expect(resultObj).toHaveLength(2);
    expect(resultObj[0]).toEqual(deck1);
    expect(resultObj[1]).toEqual(deck2);
  });
});

describe("api/GetCards", () => {
  beforeAll((done) => {
    appServer = app.listen(0, done);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => appServer.close());

  test("gets card printings group for given card name", async () => {
    const mockResponse = {
      data: {
        cards: [
          getPrinting(BlackLotus_Card, 0),
          getPrinting(BlackLotus_Card, 1),
        ],
      },
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await request(app).get(
      `/api/GetCards?cardName=${BlackLotus}`
    );
    const resultObj = JSON.parse(result.text);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(MTGIO_URL_NAME, {
      params: { name: BlackLotus },
    });
    expect(resultObj).toHaveLength(1);
    expect(resultObj[0]).toEqual(BlackLotus_Card);
  });

  test("orders card groups by name", async () => {
    const mockResponse = {
      data: {
        cards: [
          getPrinting(GildedLotus_Card, 0),
          getPrinting(GildedLotus_Card, 1),
          getPrinting(BlackLotus_Card, 0),
          getPrinting(BlackLotus_Card, 1),
        ],
      },
    };
    axios.get.mockResolvedValue(mockResponse);

    const Lotus = "Lotus";
    const result = await request(app).get(`/api/GetCards?cardName=${Lotus}`);
    const resultObj = JSON.parse(result.text);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(MTGIO_URL_NAME, {
      params: { name: Lotus },
    });

    expect(resultObj).toHaveLength(2);
    expect(resultObj[0]).toEqual(BlackLotus_Card);
    expect(resultObj[1]).toEqual(GildedLotus_Card);
  });

  test("orders printings by multiverseid", async () => {
    const mockResponse = {
      data: {
        cards: [
          getPrinting(BlackLotus_Card, 1),
          getPrinting(BlackLotus_Card, 0),
        ],
      },
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await request(app).get(
      `/api/GetCards?cardName=${BlackLotus}`
    );
    const resultObj = JSON.parse(result.text);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(MTGIO_URL_NAME, {
      params: { name: BlackLotus },
    });

    expect(resultObj).toHaveLength(1);
    expect(resultObj[0]).toEqual(BlackLotus_Card);
  });

  test("returns two groups of cards if two card names retrieved", async () => {
    const mockResponse = {
      data: {
        cards: [
          getPrinting(BlackLotus_Card, 0),
          getPrinting(BlackLotus_Card, 1),
          getPrinting(GildedLotus_Card, 0),
          getPrinting(GildedLotus_Card, 1),
        ],
      },
    };
    axios.get.mockResolvedValue(mockResponse);
    const Lotus = "Lotus";
    const result = await request(app).get(`/api/GetCards?cardName=${Lotus}`);
    const resultObj = JSON.parse(result.text);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(MTGIO_URL_NAME, {
      params: { name: Lotus },
    });

    expect(resultObj).toHaveLength(2);
    expect(resultObj[0]).toEqual(BlackLotus_Card);
    expect(resultObj[1]).toEqual(GildedLotus_Card);
  });

  test("returns empty list if no card name given", async () => {
    const result = await request(app).get(`/api/GetCards?cardName=`);

    expect(axios.get).toHaveBeenCalledTimes(0);
    expect(result.text).toBe("");
  });

  test("returns empty list if no card matches name given", async () => {
    const mockResponse = {
      data: {
        cards: [],
      },
    };
    axios.get.mockResolvedValue(mockResponse);
    const result = await request(app).get(`/api/GetCards?cardName=NoCards`);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result.text).toBe("[]");
  });
});

describe("api/SaveDeck", () => {
  beforeAll((done) => {
    appServer = app.listen(0, done);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => appServer.close());

  test("calling Save Deck makes call to write updated decks to file system", async () => {
    const updateDeck = { id: 1, name: "Test Deck A", cards: [] };
    const result = await request(app)
      .put(`/api/SaveDeck/${updateDeck.id}`)
      .send(updateDeck);

    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(200);
  });
});
