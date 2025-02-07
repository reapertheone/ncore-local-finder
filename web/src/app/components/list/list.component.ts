import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieResult } from '../../types/movies';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule,RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
constructor(
  private http:HttpClient,
  private readonly activated:ActivatedRoute
){
}
private pageNumber:number=1
private pageNumberS=new BehaviorSubject<number>(this.pageNumber)
public pageNumber$:Observable<number>=this.pageNumberS.asObservable()
public movies:Observable<MovieResult[]>=new Observable<MovieResult[]>()
  ngOnInit(): void {
    this.movies=this.pageNumberS.pipe(switchMap(page=>{
      console.log(page)
      return this.http.get<MovieResult[]>(`/api/movie?page=${page}`)
    }))

  }
  pageIncrease(){
    this.pageNumber++
    this.pageNumberS.next(this.pageNumber)
  }


}
