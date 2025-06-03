import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../../interfaces/booking';
import { Property } from '../../interfaces/property';
import { BookingService } from '../../services/booking.service';
import { PropertyService } from '../../services/property.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-requests-for-my-properties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests-for-my-properties.component.html',
  styleUrl: './requests-for-my-properties.component.css'
})
export class RequestsForMyPropertiesComponent implements OnInit {
  bookings: Booking[] = [];
  properties: { [propertyId: number]: Property } = {};

  constructor(
    private bookingService: BookingService,
    private propertyService: PropertyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.id) {
      this.loadUserPropertiesAndBookings(user.id);
    }
  }

  loadUserPropertiesAndBookings(userId: number): void {
    this.propertyService.getPropertiesByLandlord(userId).subscribe({
      next: (userProperties: Property[]) => {
        const propertyIds = userProperties.map(p => p.id);
        userProperties.forEach(p => this.properties[p.id!] = p);

        this.bookingService.getAllBookings().subscribe({
          next: (allBookings: Booking[]) => {
            // Filtrar las reservas que corresponden a propiedades del usuario
            this.bookings = allBookings.filter(b => propertyIds.includes(b.propertyId));
          },
          error: err => console.error('Error cargando bookings:', err)
        });
      },
      error: err => console.error('Error cargando propiedades:', err)
    });
  }

  rejectBooking(bookingId: number | undefined): void {
  if (bookingId === undefined) {
  console.error('ID de reserva no definido.');
  return;
  }
  this.bookingService.rejectBooking(bookingId).subscribe({
  next: () => {
  console.log(`Reserva con ID ${bookingId} rechazada.`);
  // Actualiza el estado localmente
  this.bookings = this.bookings.map(b =>
  b.id === bookingId ? { ...b, state: 'REJECTED' } : b
  );
  },
  error: (err) => {
  console.error('Error al rechazar la reserva:', err);
  alert('No se pudo rechazar la reserva. Intenta de nuevo.');
  }
  });
  }

  acceptBooking(bookingId: number | undefined): void {
  if (bookingId === undefined) {
  console.error('ID de reserva no definido.');
  return;
  }
  this.bookingService.approvetBooking(bookingId).subscribe({
      next: () => {
  console.log(`Reserva con ID ${bookingId} aprobada.`);
        // Actualiza el estado localmente sin volver a llamar al backend
        this.bookings = this.bookings.map(b =>
          b.id === bookingId ? { ...b, state: 'APPROVED' } : b
        );
      },
  error: err => console.error('Error al aprobar la reserva:', err)
  });
  }

  }
