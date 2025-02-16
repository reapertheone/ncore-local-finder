import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieDetailsDto, MovieResult, SearchMovieResult } from '../../types/movies';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  public search(searchValue:string):Observable<SearchMovieResult[]>{
    const acceptedMediaTypes=['movie','tv']
    return this.http.get<SearchMovieResult[]>(`/api/movie/search?search=${searchValue}`)
    .pipe(map(x=>x.filter(res=>acceptedMediaTypes.includes(res.media_type))))
  }

  public details(id:number):Observable<MovieDetailsDto>{
    const url=`/api/movie/${id}`
    return this.http.get<MovieDetailsDto>(url)
  }
}
