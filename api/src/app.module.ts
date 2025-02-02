import { Module } from '@nestjs/common';
import { MovieController } from './controllers/movie/movie.controller';
import { NcoreService } from './services/ncore/ncore/ncore.service';
import { TmdbService } from './services/tmdb/tmdb/tmdb.service';
import { ConfigModule } from '@nestjs/config';
import { NCoreCredentials } from './types/NCore';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [MovieController],
  providers: [
    NcoreService,
    TmdbService,
    {
      provide: 'NCORE_CREDENTIALS',
      useValue: {
        username: process.env.NCORE_USERNAME,
        password: process.env.NCORE_PASSWORD,
        mainUrl: process.env.NCORE_URL,
      } as NCoreCredentials,
    },
  ],
})
export class AppModule {}
