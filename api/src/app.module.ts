import { Module } from '@nestjs/common';
import { MovieController } from './controllers/movie/movie.controller';
import { NcoreService } from './services/ncore/ncore/ncore.service';
import { TmdbService } from './services/tmdb/tmdb/tmdb.service';
import { ConfigModule } from '@nestjs/config';
import { NCoreCredentials } from './types/NCore';
import { HttpModule } from '@nestjs/axios';
import { MovieService } from './services/movie/movie/movie.service';
import { TMDBConfig } from './types/tmdb';
import { UtilitiesService } from './services/utilities/utilities/utilities.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [MovieController],
  providers: [
    NcoreService,
    TmdbService,
    {
      provide: 'TMDB_CONFIG',
      useValue: {
        API_KEY: process.env.TMDB_API_KEY,
        URL: process.env.TMDB_API_URL,
        VERSION: Number.parseInt(process.env.TMDB_API_VERSION),
        POSTER_URL: process.env.TMDB_API_POSTER_URL,
      } satisfies TMDBConfig,
    },
    {
      provide: 'NCORE_CREDENTIALS',
      useValue: {
        username: process.env.NCORE_USERNAME,
        password: process.env.NCORE_PASSWORD,
        mainUrl: process.env.NCORE_URL,
      } satisfies NCoreCredentials,
    },
    MovieService,
    UtilitiesService,
  ],
})
export class AppModule {}
