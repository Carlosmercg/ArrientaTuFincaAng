import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../interfaces/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = 'http://localhost:8080/api/ratings'; // Ajusta según tu API

  constructor(private http: HttpClient) {}

  submitRating(rating: Rating): Observable<any> {
    return this.http.post(`${this.baseUrl}/comment`, rating);
  }

  getRatingsByPropertyId(id: number): Observable<Rating[]> {
  return this.http.get<Rating[]>(`${this.baseUrl}/getrating/${id}`);
}
}
