import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResult } from '../../types/movies';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  public search(searchValue:string):Observable<MovieResult[]>{
    return this.http.get<MovieResult[]>(`/api/movie/search?search=${searchValue}`)
  }
}
