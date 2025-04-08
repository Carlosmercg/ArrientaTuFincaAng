import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../../interfaces/housing-location';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [HousingLocationComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    housingLocations: HousingLocation[] = [
      {
        id: 1,
        description: 'Hermosa casa familiar con jardín',
        name: 'Casa en las Colinas',
        city: 'Medellín',
        country: 'Colombia',
        imageUrl: '../assets/logo.png',
        price: 250000000
      },
      {
        id: 2,
        description: 'Moderno apartamento con vista al mar',
        name: 'Apartamento Playa',
        city: 'Cartagena',
        country: 'Colombia',
        imageUrl: '../../assets/images/images.jpg',
        price: 180000000
      },
      {
        id: 3,
        description: 'Acogedora cabaña en zona cafetera',
        name: 'Cabaña del Café',
        city: 'Armenia',
        country: 'Colombia',
        imageUrl: 'assets/images/house3.jpg',
        price: 120000000
      },
      {
        id: 4,
        description: 'Lujoso penthouse en zona exclusiva',
        name: 'Penthouse Ciudad',
        city: 'Bogotá',
        country: 'Colombia',
        imageUrl: 'assets/images/house4.jpg',
        price: 350000000
      },
      {
        id: 5,
        description: 'Finca campestre con piscina',
        name: 'Finca La Pradera',
        city: 'Cali',
        country: 'Colombia',
        imageUrl: 'assets/images/house5.jpg',
        price: 200000000
      }
    ];
}
