import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilitiesService {
  public parseQueryParams<SPType>(params: Partial<SPType>): string {
    const keys = Object.keys(params);
    let query: string = '';

    keys.forEach((key) => {
      query += this.parseQueryParam<SPType>(
        key as keyof Partial<SPType>,
        params,
      );
    });

    return query;
  }

  private parseQueryParam<SPType>(
    key: keyof Partial<SPType>,
    params: Partial<SPType>,
  ): string {
    let query = '';
    if (typeof key === 'string' && params[key]) {
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
