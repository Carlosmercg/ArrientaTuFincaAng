import { RequestState } from '../enums/request-state.enum'; // Ajusta ruta si es necesario

export class RentalRequestResponseDTO {
  constructor(
    public id: number,
    public state: RequestState,
    public createdAt: string,
    public propertyTitle: string
  ) {}
}
