export class PaymentDTO {
    constructor(
      public rentalRequestId: number,
      public transactionId: number | null,
      public amount: number,
      public state: 'PENDING' | 'COMPLETED' | 'FAILED',
      public paymentDate: string,
      public status: 'ACTIVE' | 'INACTIVE'
    ) {}
  }
  