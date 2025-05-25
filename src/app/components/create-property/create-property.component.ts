import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]

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
    title: '',
    city: '',
    country: '',
    imageUrl: '',
    pricePerDay: 0,
    bathrooms: 0,
    bedrooms: 0,
    rating: [] // Inicializamos el array de rating vacío
  };

  constructor(private propertyService: PropertyService) { } // Inyecta tu servicio

  ngOnInit(): void {
    // Aquí podrías cargar datos iniciales si fuera una edición,
    // pero para "crear" usualmente se inicializa vacío.
  }

  createProperty(): void {
    // 1. Opcional: Validaciones adicionales del formulario
    if (!this.property.title || !this.property.description || !this.property.city) {
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }
    // Puedes añadir más validaciones aquí, como URL de imagen válida, números positivos, etc.

    // 2. Llama al servicio para crear la propiedad
    this.propertyService.createProperty(this.property).subscribe({
      next: (newProperty: Property) => {
        console.log('Propiedad creada con éxito:', newProperty);
        alert('¡Propiedad creada correctamente!');
        // Opcional: Reiniciar el formulario o redirigir al usuario
        this.resetForm();
        // this.router.navigate(['/my-properties']); // Si usas Angular Router
      },
      error: (err: any) => {
        console.error('Error al crear la propiedad:', err);
        alert('Hubo un error al crear la propiedad. Inténtalo de nuevo.');
        // Puedes agregar lógica para mostrar errores específicos de la API
      }
    });
  }

  resetForm(): void {
    // Reinicia el objeto 'property' a sus valores iniciales
    this.property = {
      description: '',
      title: '',
      city: '',
      country: '',
      imageUrl: '',
      pricePerDay: 0,
      bathrooms: 0,
      bedrooms: 0,
      rating: []
    };
  }
}