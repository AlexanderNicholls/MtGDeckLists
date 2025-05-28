import { http, HttpResponse } from "msw";
import MockData from "../__test__/__mocks__/MockData";
import { Logs, URIs } from "../__test__/__mocks__/MockApi";

const Handlers = [
  http.get(URIs.BaseUrl, ({ request }) => {
    Logs.LogCall(request.url, []);
    return HttpResponse.json();
  }),

  http.get(URIs.GetByCardName, ({ request }) => {
    const url = new URL(request.url);
    const cardName = url.searchParams.get("cardName");
    Logs.LogCall(URIs.GetByCardName, [cardName ?? ""]);

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

export default Handlers;
