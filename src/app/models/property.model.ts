export class PropertyDTO {
    constructor(
      public landlordId: number,
      public title: string,
      public description: string,
      public bathrooms: number,
      public bedrooms: number,
      public area: number,
      public city: string,
      public address: string,
      public price: number
    ) {}
  }
  