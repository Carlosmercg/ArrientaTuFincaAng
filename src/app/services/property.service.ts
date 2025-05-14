import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { get } from 'http';
import { Property } from '../interfaces/property';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'api/'; // Ajusta esta URL a tu API real
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
  constructor(private http: HttpClient) { }
  private propertiesSource = new BehaviorSubject<Property[]>(this.properties);
  currentProperties = this.propertiesSource.asObservable();
  getProperties() {
    return this.properties;  
  }
  getPropertyById(id: number): any {
    return this.properties.find(property => property.id === id) || null;
  }
  private normalizeText(text: string): string {
  return text?.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
              .toLowerCase() || '';
}
  filterProperties(category: string, searchQuery: string): Property[] {
    if (!searchQuery || !category) {
      return this.properties; // Devuelve todas si no hay criterios
    }

    const normalizedSearch = searchQuery.toLowerCase();
    
    switch(category) {
      case 'Titulos':
        return this.properties.filter(property => 
          property.name?.toLowerCase().includes(normalizedSearch)
        );
      case 'Ciudades':
        return this.properties.filter(property => 
          property.city?.toLowerCase().includes(normalizedSearch)
        );
      case 'Países':
        return this.properties.filter(property => 
          property.country?.toLowerCase().includes(normalizedSearch)
        );
      case 'Descripción':
        return this.properties.filter(property => 
          property.description?.toLowerCase().includes(normalizedSearch)
        );
      default:
        return this.properties; // Devuelve todas si la categoría no coincide
    }
  }
  updateFilteredProperties(category: string, searchQuery: string) {
    let filtered = this.properties;
    
    if (searchQuery) {
      const normalizedQuery = this.normalizeText(searchQuery);
      
      filtered = filtered.filter(p => {
        switch(category) {
          case 'title':
            return this.normalizeText(p.name).includes(normalizedQuery);
          case 'city':
            return this.normalizeText(p.city).includes(normalizedQuery);
          case 'country':
            return this.normalizeText(p.country).includes(normalizedQuery);
          case 'description':
            return this.normalizeText(p.description).includes(normalizedQuery);
          default:
            // Búsqueda en todos los campos si no hay categoría
            return this.normalizeText(p.name).includes(normalizedQuery) ||
                  this.normalizeText(p.city).includes(normalizedQuery) ||
                  this.normalizeText(p.country).includes(normalizedQuery) ||
                  this.normalizeText(p.description).includes(normalizedQuery);
        }
      });
    }
    
    this.propertiesSource.next(filtered);
  }
  resetFilters() {
    this.propertiesSource.next(this.properties);
  }
  
}

