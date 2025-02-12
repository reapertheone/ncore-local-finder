import { Component, Input, OnInit } from '@angular/core';
import { MovieResult, SeriesResult } from '../../types/movies';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

constructor(private route:Router){}
ngOnInit(): void {

}
@Input() movie!:MovieResult //| SeriesResult
}
