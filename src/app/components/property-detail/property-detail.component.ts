import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { FormatPricePipe } from '../../pipes/format-price.pipe';
import { Property } from '../../interfaces/property';
import { StarRatingComponent } from "../star-rating/star-rating.component";
@Component({
  selector: 'app-property-detail',
  imports: [FormatPricePipe, CommonModule, StarRatingComponent],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {
  property: any= null;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
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
  
}