import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URL } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';
import { Response } from '../types/response.type';
import { Page } from '../types/page.type';
import { CommonResourceService } from './resource.service';

@Injectable({
  providedIn: 'root',
})
export class PageService extends CommonResourceService {
  constructor(httpService: HttpClient) {
    super(httpService);
  }

  public getPages(
    show?: number,
    page?: number
  ): Observable<Response<Array<Page>>> {
    return this._httpClientService.get<Response<Array<Page>>>(
      URL.pages + '?' + this.commonShowPageQuery(show, page),
      HttpConfig.getDefaultOptions()
    );
  }

  public getPage(uid: string): Observable<Response<Page>> {
    return this._httpClientService.get<Response<Page>>(
      URL.page + '/' + uid,
      HttpConfig.getDefaultOptions()
    );
  }

  public getPageBySlug(slug: string): Observable<Response<Page>> {
    return this._httpClientService.get<Response<Page>>(
      URL.page + '/slug?slug=' + slug,
      HttpConfig.getDefaultOptions()
    );
  }
}
