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
  id: string;
  printingDate: string;

  constructor(imageUrl: string, id: string, printingDate: string) {
    this.imageUrl = imageUrl;
    this.id = id;
    this.printingDate = printingDate;
  }
}

export { Card, Printing };
