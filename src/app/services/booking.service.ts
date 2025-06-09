import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../interfaces/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/api/rental-requests'; 

  constructor(private http: HttpClient) {}

createBooking(booking: Booking): Observable<Booking> {
  return this.http.post<Booking>(`${this.apiUrl}/create`, booking);
}

  getBookingsForTenant(tenantId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/tenant/${tenantId}`);
  }

  cancelBooking(bookingId: number): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${bookingId}/cancel`, {});
}

    getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/landlord/all`);
  }

    approvetBooking(bookingId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${bookingId}/approve`, {});
}

    rejectBooking(bookingId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${bookingId}/reject`, {});
}

}
