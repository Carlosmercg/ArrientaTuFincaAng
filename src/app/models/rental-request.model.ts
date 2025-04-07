import { RequestState } from '../enums/request-state.enum';
import { StatusEnum } from '../enums/status.enum';

export class RentalRequestDTO {
  constructor(
    public id: number,
    public tenantId: number,
    public propertyId: number,
    public state: RequestState,
    public status: StatusEnum
  ) {}
}
