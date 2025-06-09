import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../../interfaces/booking';
import { Property } from '../../interfaces/property';
import { BookingService } from '../../services/booking.service';
import { PropertyService } from '../../services/property.service';

@Component({
  standalone: true,
  selector: 'app-my-bookings',
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  properties: { [propertyId: number]: Property } = {};

  constructor(
    private bookingService: BookingService,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const tenantId = user?.id;

    if (!tenantId) {
      console.error('No se encontró el ID del inquilino.');
      return;
    }

    this.bookingService.getBookingsForTenant(tenantId).subscribe({
      next: (data) => {
        this.bookings = data;

        const uniquePropertyIds = Array.from(new Set(data.map(b => b.propertyId)));

        uniquePropertyIds.forEach(propertyId => {
          this.propertyService.getPropertyById(propertyId).subscribe({
            next: (property: Property) => {
              this.properties[propertyId] = property;
            },
            error: (err) => {
              console.error(`Error al obtener propiedad con ID ${propertyId}:`, err);
            }
          });
        });
      },
      error: (err) => console.error('Error al cargar reservas:', err)
    });
  }

cancelBooking(bookingId: number): void {
  this.bookingService.cancelBooking(bookingId).subscribe({
    next: () => {
      console.log(`Reserva con ID ${bookingId} cancelada.`);
      // Actualiza el estado localmente sin volver a llamar al backend
      this.bookings = this.bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'CANCELLED' } : b
      );
    },
    error: (err) => {
      console.error('Error al cancelar la reserva:', err);
      alert('No se pudo cancelar la reserva. Intenta de nuevo.');
    }
  });
}
}
