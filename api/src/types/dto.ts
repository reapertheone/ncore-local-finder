import { ITorrent } from './NCore';
import { MovieDetails } from './tmdb';

export interface MovieDetailsDto extends MovieDetails {
  torrents: ITorrent[];
}
