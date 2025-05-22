import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyComponent } from '../property/property.component';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../interfaces/property';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [PropertyComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  propiedades: Property[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.listarpropiedades().subscribe();

    this.propertyService.currentProperties.subscribe(lista => {
      console.log('Propiedades recibidas en el componente:', lista); // Debug
      this.propiedades = lista;
    });
  }
}
