import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyComponent } from '../property/property.component';
import { Property } from '../../interfaces/property';
import { PropertyService } from '../../services/property.service';
import { propertyDTO } from '../../DTO/propertyDTO';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [PropertyComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  propiedades : propertyDTO[] = [];
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
