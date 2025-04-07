import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';
import { PaymentDTO } from '../../models/payment.model'; 
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
})
export class PaymentComponent {
  respuestaPago: PaymentDTO | null = null;
  errorPago: any = null;

  constructor(private paymentService: PaymentService) {}

  realizarPago() {
    const pago = new PaymentDTO(
      87,                         
      null,                       
      100000,                     
      'PENDING',                  
      new Date().toISOString(),   
      'ACTIVE'                    
    );

    this.paymentService.processPayment(pago).subscribe({
      next: (resp) => {
        this.respuestaPago = resp;
        this.errorPago = null;
      },
      error: (err) => {
        this.errorPago = err;
        this.respuestaPago = null;
      },
    });
  }
}
