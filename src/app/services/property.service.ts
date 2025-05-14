import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'api/'; // Ajusta esta URL a tu API real

  constructor(private http: HttpClient) { }

  getProperties() {
    return this.properties;  
  }
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
    pricePerDay: 250000,
    bathrooms: 3,
    bedrooms: 4,
    rating: [4.8, 4.7, 4.9, 4.6]
  },
  {
    id: 2,
    description: 'Moderno apartamento con vista al mar',
    name: 'Apartamento Playa',
    city: 'Cartagena',
    country: 'Colombia',
    imageUrl: 'assets/images/house.jpg',
    pricePerDay: 180000,
    bathrooms: 2,
    bedrooms: 3,
    rating: [4.5, 4.6, 4.4, 4.7]
  },
  {
    id: 3,
    description: 'Acogedora cabaña en zona cafetera',
    name: 'Cabaña del Café',
    city: 'Armenia',
    country: 'Colombia',
    imageUrl: 'assets/images/house.jpg',
    pricePerDay: 120000,
    bathrooms: 2,
    bedrooms: 2,
    rating: [4.9, 4.8, 4.7, 5.0]
  },
  {
    id: 4,
    description: 'Lujoso penthouse en zona exclusiva',
    name: 'Penthouse Ciudad',
    city: 'Bogotá',
    country: 'Colombia',
    imageUrl: 'assets/images/house.jpg',
    pricePerDay: 350000,
    bathrooms: 4,
    bedrooms: 3,
    rating: [4.7, 4.9, 4.8, 4.6]
  },
  {
    id: 5,
    description: 'Finca campestre con piscina',
    name: 'Finca La Pradera',
    city: 'Cali',
    country: 'Colombia',
    imageUrl: 'assets/images/house.jpg',
    pricePerDay: 200000,
    bathrooms: 3,
    bedrooms: 4,
    rating: [4.6, 4.5, 4.7, 4.8]
  }
];
}

