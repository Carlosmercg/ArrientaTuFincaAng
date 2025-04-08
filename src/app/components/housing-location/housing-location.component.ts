import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../../interfaces/housing-location';
import { FormatPricePipe } from '../../pipes/format-price.pipe'; 
@Component({
  standalone: true,
  selector: 'app-housing-location',
  imports: [CommonModule, FormatPricePipe],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;


}
