import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'api/'; // Ajusta esta URL a tu API real

  constructor(private http: HttpClient) { }

  
  getPropertyById(id: number): any {
    return this.properties.find(property => property.id === id) || null;
  }
  properties = [
        {
          id: 1,
          description: 'Hermosa casa familiar con jardín',
          name: 'Casa en las Colinas',
          city: 'Medellín',
          country: 'Colombia',
          imageUrl: 'assets/images/house.jpg',
          price: 250000000,
          score: 4.5
        },
        {
          id: 2,
          description: 'Moderno apartamento con vista al mar',
          name: 'Apartamento Playa',
          city: 'Cartagena',
          country: 'Colombia',
          imageUrl: 'assets/images/house.jpg',
          price: 180000000,
          score: 4.5
        },
        {
          id: 3,
          description: 'Acogedora cabaña en zona cafetera',
          name: 'Cabaña del Café',
          city: 'Armenia',
          country: 'Colombia',
          imageUrl: 'assets/images/house.jpg',
          price: 120000000,
          score: 4.5
        },
        {
          id: 4,
          description: 'Lujoso penthouse en zona exclusiva',
          name: 'Penthouse Ciudad',
          city: 'Bogotá',
          country: 'Colombia',
          imageUrl: 'assets/images/house.jpg',
          price: 350000000,
          score: 4.5
        },
        {
          id: 5,
          description: 'Finca campestre con piscina',
          name: 'Finca La Pradera',
          city: 'Cali',
          country: 'Colombia',
          imageUrl: 'assets/images/house.jpg',
          price: 200000000,
          score: 4.5
        }
      ];
}

