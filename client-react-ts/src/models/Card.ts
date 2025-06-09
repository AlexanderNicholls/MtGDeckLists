class Card {
  name: string;
  selectedPrinting: number;
  printings: Printing[];

  constructor(name: string, selectedPrinting: number, printings: Printing[]) {
    this.name = name;
    this.selectedPrinting = selectedPrinting;
    this.printings = printings;
  }
}

class Printing {
  imageUrl: string;
  multiverseid: number;

  constructor(imageUrl: string, multiverseid: number) {
    this.imageUrl = imageUrl;
    this.multiverseid = multiverseid;
  }
}

export { Card, Printing };
