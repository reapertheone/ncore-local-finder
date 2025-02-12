import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from 'src/services/movie/movie/movie.service';

@Controller('api/movie')
export class MovieController {
  constructor(private movie: MovieService) {}

  @Get()
  public async getMovies(@Query('page') page: number = 1) {
    return await this.movie.getMovies(page);
  }

  @Get('search')
  public async search(@Query('search') searchParam: string) {
    return await this.movie.search(searchParam);
  }
  @Get(':id')
  public async getMovie(@Param('id') id: number) {
    return await this.movie.getDetails(id);
  }
}
