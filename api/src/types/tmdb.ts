export interface TMDBConfig {
  API_KEY: string;
  URL: string;
  VERSION: number;
  POSTER_URL: string;
}

export enum SearchParamNames {
  includeAdult = 'include_adult',
  page = 'page',
  language = 'language',
  includeVideos = 'include_video',
  releaseDateLTE = 'release_date.lte',
  sortBy = 'sort_by',
}

export enum LanguageOptions {
  enUS = 'en-US',
}
export enum SortByOptions {
  popularityDesc = 'popularity.desc',
}
export interface TMDBSearchParams {
  [SearchParamNames.includeAdult]: boolean;
  [SearchParamNames.page]: number;
  [SearchParamNames.language]: LanguageOptions;
  [SearchParamNames.includeVideos]: boolean;
  [SearchParamNames.releaseDateLTE]: string;
  [SearchParamNames.sortBy]: SortByOptions;
}

export interface MovieResult {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface DiscoverResults {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchResult {
  movie_results: MovieResult[];
  person_results: any[];
  tv_results: any[];
  tv_episode_results: any[];
  tv_season_results: any[];
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}
