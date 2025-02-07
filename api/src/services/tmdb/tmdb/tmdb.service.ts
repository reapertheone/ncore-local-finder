import { Inject, Injectable } from '@nestjs/common';
import { UtilitiesService } from 'src/services/utilities/utilities/utilities.service';
import {
  DiscoverResults,
  MovieDetails,
  SearchResult,
  TMDBConfig,
  TMDBSearchParams,
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
        poster_path: `${this.tmdbConfig.POSTER_URL}/original${x.poster_path}`,
        backdrop_path: `${this.tmdbConfig.POSTER_URL}/original${x.backdrop_path}`,
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
    const jsonRes = (await res.json()) as SearchResult;
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

  private getFullImageUrl(url: string): string {
    return `${this.tmdbConfig.POSTER_URL}/original${url}`;
  }
}
