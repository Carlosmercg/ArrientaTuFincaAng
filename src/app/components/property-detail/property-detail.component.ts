import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; 
import { PropertyService } from '../../services/property.service';
import { FormatPricePipe } from '../../pipes/format-price.pipe';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-detail',
  imports: [FormsModule, FormatPricePipe, CommonModule, StarRatingComponent, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule],
  standalone: true,
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {
  property: any= null;
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  today = new Date();
  
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router

  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const propertyId = parseInt(id, 10);
      this.property = this.propertyService.getPropertyById(propertyId);
    }
  }
  onRatingChange(newRating: number): void {
    this.property.score = newRating;
    console.log('Nueva puntuación:', this.property.puntuacion);
    // Aquí puedes enviar la nueva puntuación al servidor si es necesario
  }
  onReserve(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.router.navigate(['/checkout/propiedad', id]);
    }
  }
  calculateAverageRating(ratings: number[]): number {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return parseFloat((sum / ratings.length).toFixed(1));
  }
  
}