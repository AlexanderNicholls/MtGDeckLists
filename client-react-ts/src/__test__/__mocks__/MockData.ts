import { Card, Printing } from "../../models/Card";

const MockData = {
  BlackLotus: {
    name: "Black Lotus",
    selectedPrinting: 0,
    printings: [
      {
        imageUrl: "http://localhost:3000/BlackLotus.jpg",
        id: "1",
      } as Printing,
      {
        imageUrl: "http://localhost:3000/BlackLotus2.jpg",
        id: "6",
      } as Printing,
    ],
  } as Card,
  GildedLotus: {
    name: "Gilded Lotus",
    selectedPrinting: 0,
    printings: [
      {
        imageUrl: "http://localhost:3000/GildedLotus.jpg",
        id: "2",
      } as Printing,
    ],
  } as Card,
  LotusPetal: {
    name: "Lotus Petal",
    selectedPrinting: 0,
    printings: [
      {
        imageUrl: "http://localhost:3000/LotusPetal.jpg",
        id: "3",
      } as Printing,
    ],
  } as Card,
  JeweledLotus: {
    name: "Jeweled Lotus",
    selectedPrinting: 0,
    printings: [
      {
        imageUrl: "http://localhost:3000/JeweledLotus.jpg",
        id: "4",
      } as Printing,
    ],
  } as Card,
  LotusBloom: {
    name: "Lotus Bloom",
    selectedPrinting: 0,
    printings: [
      {
        imageUrl: "http://localhost:3000/LotusBloom.jpg",
        id: "5",
      } as Printing,
    ],
  } as Card,

  NetworkError: "Network Error",
};

export default MockData;
