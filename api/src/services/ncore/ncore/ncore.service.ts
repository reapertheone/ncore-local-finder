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
import { JSDOM } from 'jsdom';
import { UtilitiesService } from 'src/services/utilities/utilities/utilities.service';

@Injectable()
export class NcoreService {
  private cookies: string | null = null;
  private refreshInterval = 3600000;
  constructor(
    @Inject('NCORE_CREDENTIALS') private ncoreAuth: NCoreCredentials,
    private util: UtilitiesService,
  ) {}

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

  public async getTorrents(params?: Partial<ITorrentSearchParams>) {
    if (!this.cookies) {
      await this.getCookies();
    }

    const searchParams: Partial<ITorrentSearchParams> = {
      [SearchParams.orderBy]: torrentOrderBy.downloadSize,
      [SearchParams.order]: 'ASC',
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
      ...params,
    };

    try {
      return (await this.torrentRequest(searchParams)).results;
    } catch {
      await this.getCookies();
      return (await this.torrentRequest(searchParams)).results;
    }
  }

  private async torrentRequest(
    params: Partial<ITorrentSearchParams>,
  ): Promise<TorrentSearchResult> {
    const url = `${this.ncoreAuth.mainUrl}/torrents.php?jsons=true${this.util.parseQueryParams(params)}`;
    const request = await fetch(url, {
      headers: {
        cookie: this.cookies,
      },
    });
    // the API returns HTML if there are no results
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

  public async getHitNRunList() {
    if (!this.cookies) {
      await this.getCookies();
    }
    const request = await fetch(
      `${this.ncoreAuth.mainUrl}/hitnrun.php?showall=true`,
      {
        headers: { cookies: this.cookies },
      },
    );
    const html = await request.text();
    const { document } = new JSDOM(html).window;

    const rows = Array.from(
      document.querySelectorAll('.hnr_all, .hnr_all2'),
    ) as HTMLElement[];
    const deletableRows = rows.filter(
      (row) => row.querySelector('.hnr_ttimespent')?.textContent === '-',
    );

    return deletableRows;
  }
}
