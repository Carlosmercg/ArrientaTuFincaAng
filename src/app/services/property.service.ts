import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Property } from '../interfaces/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:8080/api/properties';
  private allProperties: Property[] = [];
  private propertiesSource = new BehaviorSubject<Property[]>([]);
  currentProperties = this.propertiesSource.asObservable();

  constructor(private http: HttpClient) {}

  /** Obtiene todas las propiedades desde la API y actualiza el estado interno */
  listarpropiedades(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl).pipe(
      tap(data => {
        this.allProperties = data;
        this.propertiesSource.next(data);
      })
    );
  }

  /** Obtiene una propiedad individual desde la API por ID */
  getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`);
  }

  /** Normaliza texto para búsqueda */
  private normalizeText(text: string): string {
    return text?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase() || '';
  }

  /** Filtro local de propiedades ya cargadas */
  filterProperties(category: string, searchQuery: string): Property[] {
    console.log('Filtrando en:', category, 'con búsqueda:', searchQuery);
    if (!searchQuery || !category) {
      return this.allProperties;
    }

    const normalizedSearch = this.normalizeText(searchQuery);

    return this.allProperties.filter(p => {
      switch (category.toLowerCase()) {
        case 'title':
        case 'titulos':
          return this.normalizeText(p.title).includes(normalizedSearch);
        case 'city':
        case 'ciudades':
          return this.normalizeText(p.city).includes(normalizedSearch);
        case 'country':
        case 'países':
          return this.normalizeText(p.country).includes(normalizedSearch);
        case 'description':
        case 'descripción':
          return this.normalizeText(p.description).includes(normalizedSearch);
        default:
          // búsqueda en todos los campos
          return this.normalizeText(p.title).includes(normalizedSearch) ||
            this.normalizeText(p.city).includes(normalizedSearch) ||
            this.normalizeText(p.country).includes(normalizedSearch) ||
            this.normalizeText(p.description).includes(normalizedSearch);
      }
    });
  }

  /** Aplica el filtro y actualiza el BehaviorSubject */
updateFilteredProperties(category: string, searchQuery: string) {
  console.log('Filtro aplicado:', { category, searchQuery });
  const filtered = this.filterProperties(category, searchQuery);
  console.log('Propiedades filtradas:', filtered);
  this.propertiesSource.next(filtered);
}

  /** Restablece el listado original */
  resetFilters() {
    this.propertiesSource.next(this.allProperties);
  }
}
