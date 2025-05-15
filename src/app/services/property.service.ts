import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { propertyDTO } from '../DTO/propertyDTO';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:8080/api/properties/';
  private allProperties: propertyDTO[] = [];
  private propertiesSource = new BehaviorSubject<propertyDTO[]>([]);
  currentProperties = this.propertiesSource.asObservable();

  constructor(private http: HttpClient) {}

  /** Obtiene todas las propiedades desde la API y actualiza el estado interno */
  listarpropiedades(): Observable<propertyDTO[]> {
    return this.http.get<propertyDTO[]>(this.apiUrl + 'search').pipe(
      tap(data => {
        this.allProperties = data;
        this.propertiesSource.next(data);
      })
    );
  }

  /** Obtiene una propiedad individual desde la API por ID */
  getPropertyById(id: number): Observable<propertyDTO> {
    return this.http.get<propertyDTO>(this.apiUrl + id);
  }

  /** Normaliza texto para búsqueda */
  private normalizeText(text: string): string {
    return text?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase() || '';
  }

  /** Filtro local de propiedades ya cargadas */
  filterProperties(category: string, searchQuery: string): propertyDTO[] {
    if (!searchQuery || !category) {
      return this.allProperties;
    }

    const normalizedSearch = this.normalizeText(searchQuery);

    return this.allProperties.filter(p => {
      switch (category.toLowerCase()) {
        case 'title':
        case 'titulos':
          return this.normalizeText(p.name).includes(normalizedSearch);
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
          return this.normalizeText(p.name).includes(normalizedSearch) ||
            this.normalizeText(p.city).includes(normalizedSearch) ||
            this.normalizeText(p.country).includes(normalizedSearch) ||
            this.normalizeText(p.description).includes(normalizedSearch);
      }
    });
  }

  /** Aplica el filtro y actualiza el BehaviorSubject */
  updateFilteredProperties(category: string, searchQuery: string) {
    const filtered = this.filterProperties(category, searchQuery);
    this.propertiesSource.next(filtered);
  }

  /** Restablece el listado original */
  resetFilters() {
    this.propertiesSource.next(this.allProperties);
  }
}
