import { Inject, Injectable } from '@nestjs/common';
import { UtilitiesService } from 'src/services/utilities/utilities/utilities.service';
import {
  DiscoverResults,
  MovieDetails,
  FindResults,
  TMDBConfig,
  TMDBSearchParams,
  SearchResults,
  MovieResult,
} from 'src/types/tmdb';

@Injectable()
export class TmdbService {
  constructor(
    @Inject('TMDB_CONFIG') private tmdbConfig: TMDBConfig,
    private util: UtilitiesService,
  ) {}

  public async discover(
    what: 'movie' | 'tv',
    params?: Partial<TMDBSearchParams>,
  ) {
    const url = `${this.tmdbConfig.URL}/${this.tmdbConfig.VERSION}/discover/${what}?api_key=${this.tmdbConfig.API_KEY}${this.util.parseQueryParams(params)}`;
    const res = await fetch(url);
    return ((await res.json()) as DiscoverResults).results.map((x) => {
      return {
        ...x,
        poster_path: this.getFullImageUrl(x.poster_path),
        backdrop_path: this.getFullImageUrl(x.backdrop_path),
      };
    }) as DiscoverResults['results'];
  }

  public async getByImdbId(id: string) {
    const url = `${this.tmdbConfig.URL}/${this.tmdbConfig.VERSION}/find/${id}?api_key=${this.tmdbConfig.API_KEY}&external_source=imdb_id`;
    const res = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    });
    const jsonRes = (await res.json()) as FindResults;
    const haveResult = jsonRes.movie_results.length > 0;
    if (haveResult) {
      return jsonRes.movie_results[0];
    }
    return null;
  }

  public async getDetails(what: 'movie' | 'tv', id: number) {
    const url = `${this.tmdbConfig.URL}/${this.tmdbConfig.VERSION}/${what}/${id}?api_key=${this.tmdbConfig.API_KEY}`;
    const detailsRes = await fetch(url);
    const details = (await detailsRes.json()) as MovieDetails;
    return {
      ...details,
      backdrop_path: this.getFullImageUrl(details.backdrop_path),
      poster_path: this.getFullImageUrl(details.poster_path),
    } as MovieDetails;
  }

  public async search(titleFragment: string) {
    const url = `${this.tmdbConfig.URL}/${this.tmdbConfig.VERSION}/search/multi?api_key=${this.tmdbConfig.API_KEY}&query=${titleFragment}&language=en-US&page=1`;
    const res = await fetch(url);
    const json = (await res.json()) as SearchResults;
    return json.results.map((movie) => {
      return {
        ...movie,
        poster_path: this.getFullImageUrl(movie.poster_path),
        backdrop_path: this.getFullImageUrl(movie.backdrop_path),
      } as MovieResult;
    });
  }

  private getFullImageUrl(url: string): string {
    return `${this.tmdbConfig.POSTER_URL}/w300${url}`;
  }
}
