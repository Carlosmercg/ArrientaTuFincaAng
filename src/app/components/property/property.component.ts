import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../../interfaces/property';
import { FormatPricePipe } from '../../pipes/format-price.pipe';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-property',
  imports: [CommonModule, FormatPricePipe, RouterModule],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent {
  @Input() property!: Property;

  constructor(private router: Router) {}
  viewPropertyDetails() {
    this.router.navigate(['/propiedad', this.property.id]);
  }

}
