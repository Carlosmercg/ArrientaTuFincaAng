import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule si usas el input hidden

@Component({
  selector: 'app-star-rating',
  standalone: true, // Marca el componente como independiente (recomendado en v17+)
  imports: [FormsModule], // Importa FormsModule si usas el input hidden
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent implements OnInit {
  @Input({ required: true }) maxRating: number = 5; // Número máximo de estrellas (marcado como requerido)
  @Input() rating: number = 0;                   // Puntuación actual
  @Output() ratingChange = new EventEmitter<number>(); // Evento para emitir la nueva puntuación

  stars: number[] = [];
  hoverRating = signal(0); // Usamos signal para el hover

  ngOnInit(): void {
    this.stars = Array(this.maxRating).fill(0).map((_, i) => i + 1);
  }

  rate(value: number): void {
    console.log('Se hizo clic en la estrella con valor:', value);
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }

  hover(value: number): void {
    this.hoverRating.set(value);
  }

  resetHover(): void {
    this.hoverRating.set(0);
  }
}