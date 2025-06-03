import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; 
import { PropertyService } from '../../services/property.service';
import { FormatPricePipe } from '../../pipes/format-price.pipe';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Property } from '../../interfaces/property';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { Booking } from '../../interfaces/booking';

@Component({
  selector: 'app-property-detail',
  imports: [FormsModule, FormatPricePipe, CommonModule, StarRatingComponent, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule],
  standalone: true,
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  today = new Date();
   property: any= null;
  
constructor(
  private route: ActivatedRoute,
  private propertyService: PropertyService,
  private bookingService: BookingService,
  private authService: AuthService,
  private router: Router
) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const propertyId = parseInt(id, 10);
      this.propertyService.getPropertyById(propertyId)
      .subscribe(
        property => this.property = property
      );
    }
  }
  onRatingChange(newRating: number): void {
    this.property.score = newRating;
    console.log('Nueva puntuación:', this.property.score);
    // Aquí puedes enviar la nueva puntuación al servidor si es necesario
  }

onReserve(): void {
  const propertyId = this.property?.id;
  const user = this.authService.getCurrentUser();

  if (!user) {
    alert('Para reservar debes iniciar sesión.');
    return;
  }

  if (!propertyId) {
    alert('No se encontró la propiedad.');
    return;
  }

  if (!this.checkInDate || !this.checkOutDate) {
    alert('Debes seleccionar fechas válidas.');
    return;
  }

  if (this.checkOutDate <= this.checkInDate) {
    alert('La fecha de salida debe ser mayor que la fecha de llegada.');
    return;
  }

  const days = Math.ceil(
    (this.checkOutDate.getTime() - this.checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const totalPrice = days * this.property.pricePerDay;

  const booking: Booking = {
    propertyId: propertyId,
    tenantId: user.id!,
    startDate: this.checkInDate.toISOString(),  // <-- LocalDateTime format
    endDate: this.checkOutDate.toISOString(),   // <-- LocalDateTime format
    totalPrice: totalPrice,
    status: 'ACTIVE',
    state: 'PENDING'
  };

  this.bookingService.createBooking(booking).subscribe({
    next: res => {
      console.log('Reserva creada:', res);
      this.router.navigate(['/mis-reservas']);
    },
    error: err => {
      console.error('Error al reservar:', err);
      alert('Error al hacer la reserva. Intenta nuevamente.');
    }
  });
}


  calculateAverageRating(ratings: number[]): number {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return parseFloat((sum / ratings.length).toFixed(1));
  }
  
}