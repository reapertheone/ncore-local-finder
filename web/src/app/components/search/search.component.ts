import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, distinct, Observable, of, switchMap, takeUntil } from 'rxjs';
import { MovieResult } from '../../types/movies';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  @Input() searchType:'movie'|'tv'='movie'
  searchResult!:Observable<MovieResult[]>
  searchValue:BehaviorSubject<string>=new BehaviorSubject<string>('')

  constructor(private movie:MovieService){}

  ngOnInit(): void {
    this.searchResult=this.searchValue.pipe(distinct(),switchMap((value)=>{
      if(value&&value.length>3){
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
