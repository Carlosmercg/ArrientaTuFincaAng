import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../../interfaces/booking';
@Component({
  standalone: true,
  selector: 'app-my-bookings',
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
  cancelBooking(bookingId: number) {  
    console.log(`Reserva con ID ${bookingId} cancelada.`);
  }
  bookings: Booking[] = [
    {
      id: 1,
      propertyId: 101,
      startDate: new Date('2023-10-01'),
      endDate: new Date('2023-10-05'),
      totalPrice: 200,
      status: 'confirmed'
    },
    {
      id: 2,
      propertyId: 102,
      startDate: new Date('2023-11-01'),
      endDate: new Date('2023-11-05'),
      totalPrice: 300,
      status: 'pending'
    },
    {
      id: 3,
      propertyId: 103,
      startDate: new Date('2023-12-01'),
      endDate: new Date('2023-12-05'),
      totalPrice: 150,
      status: 'cancelled'
    }
  ];

}
