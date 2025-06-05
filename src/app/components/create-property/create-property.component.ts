import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { AuthService } from '../../services/auth.service'

// Importa tu interfaz Property
import { Property } from '../../interfaces/property'; // Ajusta la ruta si es necesario

// Importa tu servicio para propiedades (deberás crearlo si no existe)
import { PropertyService } from '../../services/property.service'; // Asumiendo que tienes un servicio de propiedades

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de incluir FormsModule
  templateUrl: './create-property.component.html',
  styleUrl: './create-property.component.css'
})
export class CreatePropertyComponent implements OnInit {
  // Inicializa un objeto 'property' con valores por defecto
  // o con un objeto vacío que coincida con la interfaz Property
  property: Property = {
    description: '',
    address: '',
    title: '',
    city: '',
    country: '',
    photos: '',
    price: 0,
    bathrooms: 0,
    bedrooms: 0,
    rating: [],
    landlordId: 0 // Inicializamos el array de rating vacío
  };

  constructor(
    private propertyService: PropertyService,
    private authService: AuthService
  ) { } // Inyecta tu servicio

  ngOnInit(): void {
    // Aquí podrías cargar datos iniciales si fuera una edición,
    // pero para "crear" usualmente se inicializa vacío.
  }

createProperty(): void {
  // Validaciones básicas
  if (!this.property.title || !this.property.description || !this.property.city) {
    alert('Por favor, rellena todos los campos obligatorios.');
    return;
  }

  const user = this.authService.getCurrentUser(); // 👈 igual que en el otro componente

  if (!user || !user.id) {
    alert('Usuario no autenticado. Inicia sesión.');
    return;
  }

  // Crear una copia del objeto con el landlordId incluido
  const propertyToSend: Property = {
    ...this.property,
    landlordId: user.id // 👈 asignamos el id del usuario autenticado
  };

  this.propertyService.createProperty(propertyToSend).subscribe({
    next: (newProperty: Property) => {
      console.log('Propiedad creada con éxito:', newProperty);
      alert('¡Propiedad creada correctamente!');
      this.resetForm();
    },
    error: (err: any) => {
      console.error('Error al crear la propiedad:', err);
      alert('Hubo un error al crear la propiedad. Inténtalo de nuevo.');
    }
  });
}


  resetForm(): void {
    // Reinicia el objeto 'property' a sus valores iniciales
    this.property = {
      description: '',
      address: '',
      title: '',
      city: '',
      country: '',
      photos: '',
      price: 0,
      bathrooms: 0,
      bedrooms: 0,
      rating: [],
      landlordId: 0
    };
  }
}