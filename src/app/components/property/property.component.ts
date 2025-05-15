import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatPricePipe } from '../../pipes/format-price.pipe';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Property } from '../../interfaces/property';
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
  
  calculateAverageRating(ratings: number[]): number {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return parseFloat((sum / ratings.length).toFixed(1));
  }

}
