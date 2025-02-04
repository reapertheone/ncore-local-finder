import { Injectable } from '@nestjs/common';
import { NcoreService } from 'src/services/ncore/ncore/ncore.service';
import { TmdbService } from 'src/services/tmdb/tmdb/tmdb.service';
import { MovieDetailsDto } from 'src/types/dto';
import { ITorrentSearchParams, SearchParams } from 'src/types/NCore';

@Injectable()
export class MovieService {
  constructor(
    private tmdb: TmdbService,
    private ncore: NcoreService,
  ) {}

  public async getMovies(page: number) {
    return this.tmdb.discover('movie', { page });
  }

  public async getDetails(id: number) {
    const details = await this.tmdb.getDetails('movie', id);
    const torrentSearchParams: Partial<ITorrentSearchParams> = {
      [SearchParams.searchQuery]: details.imdb_id,
      [SearchParams.searchTarget]: 'imdb',
    };
    const torrents = await this.ncore.getTorrents(torrentSearchParams);
    return { ...details, torrents } as MovieDetailsDto;
  }
}
