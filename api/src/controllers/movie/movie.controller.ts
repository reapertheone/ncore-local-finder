import { Controller, Get } from '@nestjs/common';
import { NcoreService } from 'src/services/ncore/ncore/ncore.service';
import { TmdbService } from 'src/services/tmdb/tmdb/tmdb.service';

@Controller('api/movie')
export class MovieController {
  constructor(
    private tmdb: TmdbService,
    private ncore: NcoreService,
  ) {}

  @Get()
  public async getMovies(): Promise<any> {
    return await this.ncore.getTorrents();
  }

  @Get(':imdbId')
  public getMovie(imdbId: string) {
    throw new Error(`not implemented id: ${imdbId}`);
  }
}
