export interface MovieResult {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  title: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface SeriesResult {

}

export type SearchMovieResult=MovieResult & {media_type:string}

export interface ITorrent {
  torrent_id: `${number}`;
  category: TorrentCategory;
  release_name: string;
  details_url: string;
  download_url: string;
  freeleech: boolean;
  imdb_id: string | false;
  imdb_rating: `${number}`;
  size: `${number}`;
  type: (typeof torrentType)[keyof typeof torrentType];
  leechers: `${number}`;
  seeders: `${number}`;
}

export const torrentCategory = {
  xvidHun: 'xvid_hun',
  xvid: 'xvid',
  dvdHun: 'dvd_hun',
  dvd: 'dvd',
  dvd9Hun: 'dvd9_hun',
  dvd9: 'dvd9',
  hdHun: 'hd_hun',
  hd: 'hd',
  xvidserHun: 'xvidser_hun',
  xvidser: 'xvidser',
  dvdserHun: 'dvdser_hun',
  dvdser: 'dvdser',
  hdserHun: 'hdser_hun',
  hdser: 'hdser',
  mp3Hun: 'mp3_hun',
  mp3: 'mp3',
  losslessHun: 'lossless_hun',
  lossless: 'lossless',
  clip: 'clip',
  xxxXvid: 'xxx_xvid',
  xxxDvd: 'xxx_dvd',
  xxxImageset: 'xxx_imageset',
  xxxHd: 'xxx_hd',
  gameIso: 'game_iso',
  gameRip: 'game_rip',
  console: 'console',
  iso: 'iso',
  misc: 'misc',
  mobil: 'mobil',
  ebookHun: 'ebook_hun',
  ebook: 'ebook',
} as const;

type TorrentCategory = (typeof torrentCategory)[keyof typeof torrentCategory];
const torrentType = {
  movie: 'movies',
} as const;

export interface MovieDetailsDto extends MovieDetails {
  torrents: ITorrent[];
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

