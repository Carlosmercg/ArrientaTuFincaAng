export class PropertySearchCriteriaDTO {
    constructor(
      public title: string = '',
      public description: string = '',
      public minBathrooms: number | null = null,
      public maxBathrooms: number | null = null,
      public minBedrooms: number | null = null,
      public maxBedrooms: number | null = null,
      public minArea: number | null = null,
      public maxArea: number | null = null,
      public city: string = '',
      public address: string = '',
      public minPrice: number | null = null,
      public maxPrice: number | null = null
    ) {}
  }
  