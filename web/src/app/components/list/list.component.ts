import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieResult } from '../../types/movies';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardComponent } from "../card/card.component";


@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterModule,  CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
constructor(
  private http:HttpClient,
  private readonly activated:ActivatedRoute
){
}
public pageNumber:number=1
private pageNumberS=new BehaviorSubject<number>(this.pageNumber)
public pageNumber$:Observable<number>=this.pageNumberS.asObservable()
public movies:Observable<MovieResult[]>=new Observable<MovieResult[]>()
  ngOnInit(): void {
    this.movies=this.activated.queryParams.pipe(switchMap(params=>{
      const page=params['page']||'1'
      this.pageNumber=Number.parseInt(page)
      return this.getMovies(page)
    }))

  }

  getMovies(page:string='1'){
    return this.http.get<MovieResult[]>(`/api/movie?page=${page}`)
  }


}
