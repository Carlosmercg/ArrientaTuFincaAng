import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyComponent } from '../property/property.component';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../interfaces/property';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [PropertyComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  propiedades : Property[] = [];
   constructor(
    private propertyService : PropertyService
   ) {} 

   ngOnInit(): void {

    this.propertyService.listarpropiedades()
    .subscribe(
      listaPropiedades => this.propiedades = listaPropiedades
    );
    
   }
}
