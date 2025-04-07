export class PropertyResponseDTO {
    constructor(
      public id: number,
      public title: string,
      public state: 'AVAILABLE' | 'UNAVAILABLE' | 'RENTED'
    ) {}
  }
  