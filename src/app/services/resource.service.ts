import { HttpClient } from '@angular/common/http';

export abstract class CommonResourceService {
  protected _httpClientService: HttpClient;

  constructor(httpClientService: HttpClient) {
    this._httpClientService = httpClientService;
  }

  protected commonShowPageQuery(show?: number, page?: number): string {
    return 'show=' + (show ?? 25) + '&page=' + (page ?? 1);
  }
}
