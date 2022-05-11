import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';

import { Page } from 'src/app/types/page.type';
import { PageService } from 'src/app/services/page.service';

@Injectable({
  providedIn: 'root',
})
export class CustomPageResolver implements Resolve<Page | null> {
  private _pageService: PageService;

  constructor(pageService: PageService) {
    this._pageService = pageService;
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Page | null> {
    return this._pageService
      .getPageBySlug(this.cleanUrl(state.url))
      .pipe(map((response) => response.data ?? null));
  }

  private cleanUrl(url: string): string {
    return url.replace(/^\//g, '');
  }
}
