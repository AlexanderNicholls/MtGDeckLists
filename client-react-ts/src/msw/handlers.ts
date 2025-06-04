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
      case MockData.BlackLotus.name:
        return HttpResponse.json([MockData.BlackLotus.printings[0].imageUrl]);
      case MockData.GildedLotus.name:
        return HttpResponse.json([MockData.GildedLotus.printings[0].imageUrl]);
      case MockData.LotusPetal.name:
        return HttpResponse.json([MockData.LotusPetal.printings[0].imageUrl]);
      case MockData.JeweledLotus.name:
        return HttpResponse.json([MockData.JeweledLotus.printings[0].imageUrl]);
      case MockData.LotusBloom.name:
        return HttpResponse.json([MockData.LotusBloom.printings[0].imageUrl]);
      case MockData.NetworkError:
        return HttpResponse.error();
      default:
        return HttpResponse.json([]);
    }
  }),
];

export default Handlers;
