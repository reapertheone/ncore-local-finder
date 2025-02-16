import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, distinct, filter, map, Observable, of, switchMap, takeUntil } from 'rxjs';
import { MovieResult, SearchMovieResult } from '../../types/movies';
import { MovieService } from '../../services/movie/movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule,RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  @Input() searchType:'movie'|'tv'='movie'
  searchResult!:Observable<SearchMovieResult[]>
  searchValue:BehaviorSubject<string>=new BehaviorSubject<string>('')

  constructor(private movie:MovieService){}

  ngOnInit(): void {
    this.searchResult=this.searchValue.pipe(switchMap((value)=>{
      if(value){
      return this.movie.search(value)
      }
      return of([])
    }))
    this.searchResult.subscribe(console.log)
  }

  onKeyUp($event: any) {
    this.searchValue.next($event.target.value || '')
  }

}



