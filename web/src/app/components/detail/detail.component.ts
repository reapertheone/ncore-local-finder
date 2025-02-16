import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { MovieDetailsDto } from '../../types/movies';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [RouterModule,CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  constructor(private movie:MovieService,private route:ActivatedRoute){}
  details!:Observable<MovieDetailsDto|null>
  ngOnInit(): void {
    this.details=this.route.params.pipe(switchMap(
      (params)=>{
      if(params['id']){
        return this.movie.details(params['id'])
      }
      return of(null);
    }))
  }

}
