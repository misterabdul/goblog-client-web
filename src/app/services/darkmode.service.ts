import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DarkModeCookie } from '../utils/contants';
import { CookieHelpers } from '../utils/cookie-helpers';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private _darkModeSubject: BehaviorSubject<boolean>;

  constructor() {
    this._darkModeSubject = new BehaviorSubject<boolean>(false);

    if (
      (CookieHelpers.readCookie(DarkModeCookie.NAME)?.indexOf(
        DarkModeCookie.SET
      ) ?? -1) == 0
    ) {
      this._darkModeSubject.next(true);
    }
  }

  get darkModeSubject(): Observable<boolean> {
    return this._darkModeSubject;
  }

  public toggleDarkMode(): void {
    if (this._darkModeSubject.value) {
      CookieHelpers.createCookie(
        DarkModeCookie.NAME,
        DarkModeCookie.UNSET,
        DarkModeCookie.EXPIRES
      );
      this._darkModeSubject.next(false);
    } else {
      CookieHelpers.createCookie(
        DarkModeCookie.NAME,
        DarkModeCookie.SET,
        DarkModeCookie.EXPIRES
      );
      this._darkModeSubject.next(true);
    }
  }
}
