import { Component, Input } from '@angular/core';
import { MovieResult, SeriesResult } from '../../types/movies';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
@Input() movie!:MovieResult //| SeriesResult
}
