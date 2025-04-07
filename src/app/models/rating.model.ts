export class RatingDTO {
    constructor(
      public requestId: number,
      public score: number,
      public comment: string
    ) {}
  }
  