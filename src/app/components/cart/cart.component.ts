import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../interfaces/property';
import { FormatPricePipe } from '../../pipes/format-price.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormatPricePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  paymentSuccess: boolean = false;
  
  property: any= null;
  constructor(
      private route: ActivatedRoute,
      private propertyService: PropertyService,
      private router: Router
    ) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const propertyId = parseInt(id, 10);
      this.property = this.propertyService.getPropertyById(propertyId);
    }
  }
  onPaymentSuccess(): void {
    this.paymentSuccess = true;
  }
  backToHome(): void {
    this.router.navigate(['/']);
  }
}
