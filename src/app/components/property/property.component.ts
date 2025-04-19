import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../../interfaces/property';
import { FormatPricePipe } from '../../pipes/format-price.pipe'; 
@Component({
  standalone: true,
  selector: 'app-property',
  imports: [CommonModule, FormatPricePipe],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent {
  @Input() property!: Property;


}
