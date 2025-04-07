import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PaymentDTO {
  rentalRequestId: number;
  transactionId: number | null;
  amount: number;
  state: 'PENDING' | 'COMPLETED' | 'FAILED';
  paymentDate: string;
  status: 'ACTIVE' | 'INACTIVE';
}

@Injectable()
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) {}

  processPayment(payment: PaymentDTO): Observable<PaymentDTO> {
    return this.http.post<PaymentDTO>(this.apiUrl, payment);
  }
}
