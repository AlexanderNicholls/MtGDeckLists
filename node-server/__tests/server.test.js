const request = require("supertest");
const app = require("../app");
const axios = require("axios");

jest.mock("axios");
const MTGIO_URL_NAME = "http://api.magicthegathering.io/v1/cards?name=";

let appServer;

const BlackLotus = "Black Lotus";
const GildedLotus = "Gilded Lotus";
const BlackLotus_Printing1 = {
  imageUrl: `http://example.com/${BlackLotus}.jpg`,
  multiverseid: 1,
  name: BlackLotus,
};
const BlackLotus_Printing2 = {
  imageUrl: `http://example.com/${BlackLotus}2.jpg`,
  multiverseid: 2,
  name: BlackLotus,
};
const GildedLotus_Printing1 = {
  imageUrl: `http://example.com/${GildedLotus}.jpg`,
  multiverseid: 3,
  name: GildedLotus,
};
const GildedLotus_Printing2 = {
  imageUrl: `http://example.com/${GildedLotus}2.jpg`,
  multiverseid: 4,
  name: GildedLotus,
};

describe("api/GetCards", () => {
  beforeAll((done) => {
    appServer = app.listen(5000, done);
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  afterAll(() => {
    appServer.close();
  });

  test("gets image url for given card name", async () => {
    const mockResponse = {
      data: {
        cards: [BlackLotus_Printing1],
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
    console.log(resultObj);
    expect(resultObj[0]).toHaveLength(1);
    expect(resultObj[0][0]).toEqual(BlackLotus_Printing1);
  });

  test("groups different printings of same card", async () => {
    const mockResponse = {
      data: {
        cards: [BlackLotus_Printing1, BlackLotus_Printing2],
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

    expect(resultObj[0]).toHaveLength(2);
    expect(resultObj[0][0]).toEqual(BlackLotus_Printing1);
    expect(resultObj[0][1]).toEqual(BlackLotus_Printing2);
  });

  test("orders card groups by name", async () => {
    const mockResponse = {
      data: {
        cards: [GildedLotus_Printing1, BlackLotus_Printing1],
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

    expect(resultObj[0]).toHaveLength(1);
    expect(resultObj[0][0]).toEqual(BlackLotus_Printing1);
    expect(resultObj[1][0]).toEqual(GildedLotus_Printing1);
  });

  test("orders printings by multiverseid", async () => {
    const mockResponse = {
      data: {
        cards: [BlackLotus_Printing2, BlackLotus_Printing1],
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

    expect(resultObj[0]).toHaveLength(2);
    expect(resultObj[0][0]).toEqual(BlackLotus_Printing1);
    expect(resultObj[0][1]).toEqual(BlackLotus_Printing2);
  });

  test("returns two groups of cards if two card names retrieved", async () => {
    const mockResponse = {
      data: {
        cards: [
          BlackLotus_Printing1,
          BlackLotus_Printing2,
          GildedLotus_Printing1,
          GildedLotus_Printing2,
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

    expect(resultObj[0]).toHaveLength(2);
    expect(resultObj[0][0]).toEqual(BlackLotus_Printing1);
    expect(resultObj[0][1]).toEqual(BlackLotus_Printing2);

    expect(resultObj[1]).toHaveLength(2);
    expect(resultObj[1][0]).toEqual(GildedLotus_Printing1);
    expect(resultObj[1][1]).toEqual(GildedLotus_Printing2);
  });

  test("returns empty list if no card name given", async () => {
    const result = await request(app).get(`/api/GetCards?cardName=`);

    expect(axios.get).toHaveBeenCalledTimes(0);
    expect(result.text).toBe("");
  });
});
