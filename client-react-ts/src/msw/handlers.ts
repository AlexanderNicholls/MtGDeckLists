import { http, HttpResponse } from "msw";

const MonitorAPI = {
  callHistory: {} as { [key: string]: {}[] },
  LogCall: (url: string, params: string[]) => {
    MonitorAPI.callHistory[url] ??= [];
    MonitorAPI.callHistory[url].push({
      uri: url,
      params: params,
    });
  },
};

const MockApiUrl = {
  BaseUrl: "http://localhost:5000/api",
  get GetByCardName() {
    return `${this.BaseUrl}/GetCards`;
  },
};

const MockData = {
  CardName_BlackLotus: "Black Lotus",
  ImageUrl_BlackLotus: "http://localhost:3000/BlackLotus.jpg",
  CardName_GildedLotus: "Gilded Lotus",
  ImageUrl_GildedLotus: "http://localhost:3000/GildedLotus.jpg",
  CardName_LotusPetal: "Lotus Petal",
  ImageUrl_LotusPetal: "http://localhost:3000/LotusPetal.jpg",
  CardName_JeweledLotus: "Jeweled Lotus",
  ImageUrl_JeweledLotus: "http://localhost:3000/JeweledLotus.jpg",
  CardName_LotusBloom: "Lotus Bloom",
  ImageUrl_LotusBloom: "http://localhost:3000/LotusBloom.jpg",

  NetworkError: "Network Error",
};

const handlers = [
  http.get(MockApiUrl.BaseUrl, ({ request }) => {
    MonitorAPI.LogCall(request.url, []);
    return HttpResponse.json();
  }),

  http.get(MockApiUrl.GetByCardName, ({ request }) => {
    const url = new URL(request.url);
    const cardName = url.searchParams.get("cardName");
    MonitorAPI.LogCall(MockApiUrl.GetByCardName, [cardName ?? ""]);

    switch (cardName) {
      case MockData.CardName_BlackLotus:
        return HttpResponse.json([MockData.ImageUrl_BlackLotus]);
      case MockData.CardName_GildedLotus:
        return HttpResponse.json([MockData.ImageUrl_GildedLotus]);
      case MockData.CardName_LotusPetal:
        return HttpResponse.json([MockData.ImageUrl_LotusPetal]);
      case MockData.CardName_JeweledLotus:
        return HttpResponse.json([MockData.ImageUrl_JeweledLotus]);
      case MockData.CardName_LotusBloom:
        return HttpResponse.json([MockData.ImageUrl_LotusBloom]);
      case MockData.NetworkError:
        return HttpResponse.error();
      default:
        return HttpResponse.json([]);
    }
  }),
];

export { handlers, MockApiUrl, MockData, MonitorAPI };
