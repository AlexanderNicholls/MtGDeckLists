import { http, HttpResponse } from "msw";

const MockApiUrl = {
  BaseUrl: "http://localhost:5000/api",
  get GetByCardName() {
    return `${this.BaseUrl}?cardName=`;
  },
};

const MockData = {
  CardName_BlackLotus: "Black Lotus",
  ImageUrl_BlackLotus: "BlackLotus.jpg",
};

const handlers = [
  http.get(`${MockApiUrl.GetByCardName}${MockData.CardName_BlackLotus}`, () => {
    return HttpResponse.json([MockData.ImageUrl_BlackLotus]);
  }),
];

export { handlers, MockApiUrl, MockData };
