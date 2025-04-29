import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { propertyDTO } from '../DTO/propertyDTO';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:8080/api/properties/'; // Ajusta esta URL a tu API real

  constructor(
    private http: HttpClient,
  ) { }

  getPropertyById(id: number): Observable<propertyDTO> {
    return this.http.get<propertyDTO>(this.apiUrl + id);
  }

  listarpropiedades(): Observable<propertyDTO[]> {
    return this.http.get<propertyDTO[]>(this.apiUrl + 'search');
  }

      
}

