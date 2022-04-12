import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URL } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';
import { Response } from '../types/response.type';
import { Page } from '../types/page.type';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(private _http: HttpClient) {}

  public getPages(): Observable<Response<Array<Page>>> {
    return this._http.get<Response<Array<Page>>>(
      URL.pages,
      HttpConfig.getDefaultOptions()
    );
  }

  public getPage(uid: string): Observable<Response<Page>> {
    return this._http.get<Response<Page>>(
      URL.page + '/' + uid,
      HttpConfig.getDefaultOptions()
    );
  }

  public getPageBySlug(slug: string): Observable<Response<Page>> {
    return this._http.get<Response<Page>>(
      URL.page + '/slug?slug=' + slug,
      HttpConfig.getDefaultOptions()
    );
  }
}
