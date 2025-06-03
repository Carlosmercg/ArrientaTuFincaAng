import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../../interfaces/booking';

@Component({
  selector: 'app-requests-for-my-properties',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './requests-for-my-properties.component.html',
  styleUrl: './requests-for-my-properties.component.css'
})
export class RequestsForMyPropertiesComponent implements OnInit {
  bookings: Booking[] = []; 
  properties: { [propertyId: number]: any } = {}; 

  ngOnInit(): void {
    this.properties[101] = { name: 'Apartamento Céntrico', address: 'Calle Falsa 123' };
    this.properties[102] = { name: 'Casa de Playa', address: 'Avenida del Mar 456' };
    this.createTestBooking();
  }
  // 
  createTestBooking(): void {
    const newBooking: Booking = {
      id: this.bookings.length + 1, // Genera un ID simple para la prueba
      propertyId: 101, // ID de una propiedad de prueba
      tenantId: 501, // ID de un inquilino de prueba
      startDate: '2025-07-01',
      endDate: '2025-07-10',
      totalPrice: 750.00,
      status: 'Pendiente', // Estado de la reserva
      state: 'Activa' // Estado interno o de gestión
    };
    this.bookings.push(newBooking);
    console.log('Reserva de prueba añadida:', newBooking);

    const anotherBooking: Booking = {
      id: this.bookings.length + 1,
      propertyId: 102,
      tenantId: 502,
      startDate: '2025-08-01',
      endDate: '2025-08-15',
      totalPrice: 1200.00,
      status: 'Aceptada',
      state: 'Confirmada'
    };
    this.bookings.push(anotherBooking);
    console.log('Otra reserva de prueba añadida:', anotherBooking);
  }


  rejectBooking(bookingId: number | undefined): void {
    if (bookingId === undefined) {
      console.warn('No se puede rechazar la reserva: bookingId es undefined.');
      return;
    }
    const bookingIndex = this.bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      this.bookings[bookingIndex].status = 'Rechazada';
      console.log(`Reserva ${bookingId} rechazada.`);
    } else {
      console.log(`Reserva con ID ${bookingId} no encontrada.`);
    }
  }


  acceptBooking(bookingId: number | undefined): void {
    if (bookingId === undefined) {
      console.warn('No se puede aceptar la reserva: bookingId es undefined.');
      return;
    }
    const bookingIndex = this.bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      this.bookings[bookingIndex].status = 'Aceptada';
      console.log(`Reserva ${bookingId} aceptada.`);
    } else {
      console.log(`Reserva con ID ${bookingId} no encontrada.`);
    }
  }
}
