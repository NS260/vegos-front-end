export class PriceDetails{
  constructor(classType: string | null | undefined, price: number) {
    this.price = price;
    this.classType = classType;
  }

  priceId!: number
  classType!: string | null | undefined
  price!: number
}
