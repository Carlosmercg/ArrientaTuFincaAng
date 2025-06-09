/* home.component.ts */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyComponent } from '../property/property.component';
import { PropertyService } from '../../services/property.service';
import { RatingService } from '../../services/rating.service';     
import { Property } from '../../interfaces/property';
import { forkJoin, of, switchMap, tap } from 'rxjs';                 

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [PropertyComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  propiedades: Property[] = [];

  constructor(
    private propertyService: PropertyService,
    private ratingService: RatingService       
  ) {}

ngOnInit(): void {
  this.propertyService.listarpropiedades()
    .pipe(
      switchMap((props) => {
        this.propiedades = props;

        // ① Nos quedamos solo con las propiedades que sí traen id
        const ratingCalls = props
          .filter(p => p.id != null)                 
          .map(p =>
            this.ratingService
              .getRatingsByPropertyId(p.id!)         
              .pipe(
                tap(ratings => {
                  // Guarda SOLO la lista de números
                  p.rating = ratings.map(r => r.rating);
                })
              )
          );

        return ratingCalls.length ? forkJoin(ratingCalls) : of([]);
      })
    )
    .subscribe({
      next: () => console.log('Propiedades con ratings:', this.propiedades),
      error: err => console.error(err)
    });
}


}
