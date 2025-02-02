/* eslint-disable @typescript-eslint/no-unused-vars */
export interface NCoreCredentials {
  username: string;
  password: string;
  mainUrl: string;
}

export interface TorrentSearchResult {
  results: ITorrent[];
  total_results: `${number}`;
  onpage: number;
  perpage: `${number}`;
}

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

export const TorrentListType = {
  all: 'all',
  allOwn: 'all_own',
  legal: 'legal',
  originalRelease: 'eredeti_releasekben',
} as const;

const torrentType = {
  movie: 'movies',
} as const;

const searchTargetValues = {
  imdbId: 'imdb',
  name: 'name',
  description: 'leiras',
  label: 'cimke',
} as const;
export const torrentOrderBy = {
  name: 'name',
  uploadTime: 'ctime',
  downloadSize: 'size',
  completedCount: 'times_completed',
  seeders: 'seeders',
  leechers: 'leechers',
} as const;

export type Order = 'ASC' | 'DESC';

export enum SearchParams {
  orderBy = 'miszerint',
  order = 'hogyan',
  searchQuery = 'mire',
  searchTarget = 'miben',
  page = 'oldal',
  searchCategories = 'kivalasztott_tipus',
}

export interface ITorrentSearchParams extends Record<SearchParams, any> {
  [SearchParams.orderBy]: (typeof torrentOrderBy)[keyof typeof torrentOrderBy];
  [SearchParams.order]: Order;
  [SearchParams.searchQuery]: string | undefined;
  [SearchParams.searchTarget]:
    | (typeof searchTargetValues)[keyof typeof searchTargetValues]
    | undefined;
  [SearchParams.page]: number | undefined;
  [SearchParams.searchCategories]: (typeof torrentCategory)[keyof typeof torrentCategory][];
}

// https://ncore.pro/torrents.php?
// miszerint=seeders&
// hogyan=DESC&
// tipus=kivalasztottak_kozott&
// kivalasztott_tipus=xvid_hun,xvid,dvd_hun,dvd,dvd9_hun,dvd9,hd_hun,hd,xvidser_hun,xvidser,dvdser_hun,dvdser,hdser_hun,hdser,mp3_hun,mp3,lossless_hun,lossless,clip,xxx_xvid,xxx_dvd,xxx_imageset,xxx_hd,game_iso,game_rip,console,iso,misc,mobil,ebook_hun,ebook&
// mire=ghghgh&
// miben=name

// https://ncore.pro/torrents.php?miszerint=seeders&hogyan=DESC&tipus=kivalasztottak_kozott&kivalasztott_tipus=xvid_hun,xvid,dvd_hun,dvd,dvd9_hun,dvd9,hd_hun,hd,xvidser_hun,xvidser,dvdser_hun,dvdser,hdser_hun,hdser,mp3_hun,mp3,lossless_hun,lossless,clip,xxx_xvid,xxx_dvd,xxx_imageset,xxx_hd,game_iso,game_rip,console,iso,misc,mobil,ebook_hun,ebook&mire=tt4154796&miben=imdb
