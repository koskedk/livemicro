export class Product {
  constructor(
    public name: string,
    public shop: string = 'Shop ZX',
    public receivedOn: Date = new Date()
  ) {
  }
}
