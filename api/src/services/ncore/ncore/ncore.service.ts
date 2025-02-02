import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  TorrentSearchResult,
  ITorrentSearchParams,
  NCoreCredentials,
  SearchParams,
  torrentCategory,
  torrentOrderBy,
} from 'src/types/NCore';

@Injectable()
export class NcoreService {
  private cookies: string | null = null;
  private refreshInterval = 3600000;
  constructor(
    @Inject('NCORE_CREDENTIALS') private ncoreAuth: NCoreCredentials,
    private http: HttpService,
  ) {}
  private login() {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  public async getCookies(): Promise<void> {
    const form = new FormData();
    form.append('set_lang', 'hu');
    form.append('submitted', '1');
    form.append('nev', this.ncoreAuth.username);
    form.append('pass', this.ncoreAuth.password);
    form.append('ne_leptessen_ki', '1');

    const url = `${this.ncoreAuth.mainUrl}/login.php`;
    const res = await fetch(url, {
      method: 'POST',
      body: form,
      redirect: 'manual',
    });
    this.cookies = res.headers.getSetCookie().join('; ');
  }

  public async getTorrents(
    params: Partial<ITorrentSearchParams> = {
      [SearchParams.orderBy]: torrentOrderBy.seeders,
      [SearchParams.order]: 'DESC',
      [SearchParams.page]: 1,
      [SearchParams.searchCategories]: [
        torrentCategory.xvidHun,
        torrentCategory.xvid,
        torrentCategory.dvd,
        torrentCategory.dvdHun,
        torrentCategory.dvd9,
        torrentCategory.dvd9Hun,
        torrentCategory.hd,
        torrentCategory.hdHun,
      ],
    },
  ) {
    if (!this.cookies) {
      await this.getCookies();
    }

    try {
      return await this.torrentRequest(params);
    } catch {
      await this.getCookies();
      return await this.torrentRequest(params);
    }

    // the API returns HTML if there are no results
  }

  private async torrentRequest(
    params: Partial<ITorrentSearchParams>,
  ): Promise<TorrentSearchResult> {
    const url = `${this.ncoreAuth.mainUrl}/torrents.php?jsons=true${this.parseQueryParams(params)}`;
    const request = await fetch(url, {
      headers: {
        cookie: this.cookies,
      },
    });
    if (request.headers.get('content-type')?.includes('application/json')) {
      return await request.json();
    }
    return {
      results: [],
      total_results: '0',
      onpage: 0,
      perpage: '0',
    };
  }

  private parseQueryParams(params: Partial<ITorrentSearchParams>): string {
    const keys = Object.keys(params);
    let query: string = '';

    keys.forEach((key) => {
      query += this.parseQueryParam(
        key as keyof Partial<ITorrentSearchParams>,
        params,
      );
    });

    return query;
  }

  private parseQueryParam(
    key: keyof Partial<ITorrentSearchParams>,
    params: Partial<ITorrentSearchParams>,
  ): string {
    let query = '';
    if (params[key]) {
      const value = params[key];
      if (!Array.isArray(value)) {
        query += `&${key}=${value}`;
        return query;
      }
      query += `&${value.join(',')}`;
    }

    return query;
  }
}
