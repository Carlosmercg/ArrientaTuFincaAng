import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; 
import { PropertyService } from '../../services/property.service';
import { FormatPricePipe } from '../../pipes/format-price.pipe';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { propertyDTO } from '../../DTO/propertyDTO';
@Component({
  selector: 'app-property-detail',
  imports: [FormatPricePipe, CommonModule, StarRatingComponent],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {
  property!: propertyDTO;
  
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const propertyId = parseInt(id, 10);
      this.propertyService.getPropertyById(propertyId)
      .subscribe(
        property => this.property = property
      );
    }
  }
  onRatingChange(newRating: number): void {
    this.property.score = newRating;
    console.log('Nueva puntuación:', this.property.score);
    // Aquí puedes enviar la nueva puntuación al servidor si es necesario
  }
  onReserve(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.router.navigate(['/checkout/propiedad', id]);
    }
  }
  
}