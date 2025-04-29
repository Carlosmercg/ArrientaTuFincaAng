import { PropertyState } from '../enums/Propertystate';
export class propertyDTO{
    constructor(
       public id: number,
       public landlordId: number,
       public title: string,
       public description: string,
       public bathrooms: number,
       public bedrooms: number,
       public area: number,
       public country: string,
       public city: string,
       public address: string,
       public price: number,
       public score: number,
       public state: PropertyState,
       public imageUrl: string
      ){}
}