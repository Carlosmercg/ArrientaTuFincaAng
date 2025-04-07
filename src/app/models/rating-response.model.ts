import { RatingType } from '../enums/rating-type.enum'; 

export class RatingResponseDTO {
  constructor(
    public id: number,
    public score: number,
    public comment: string,
    public date: string, 
    public type: RatingType,
    public requestId: number
  ) {}
}
