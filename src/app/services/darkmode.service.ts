import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DarkModeCookie } from '../utils/contants';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private isDarkModeSubject: BehaviorSubject<boolean>;

  constructor() {
    this.isDarkModeSubject = new BehaviorSubject<boolean>(false);

    if (
      (this.readCookie(DarkModeCookie.NAME)?.indexOf(DarkModeCookie.SET) ??
        -1) == 0
    ) {
      this.isDarkModeSubject.next(true);
    }
  }

  public toggleDarkMode(): void {
    if (this.isDarkModeSubject.value) {
      this.createCookie(
        DarkModeCookie.NAME,
        DarkModeCookie.UNSET,
        DarkModeCookie.EXPIRES
      );
      this.isDarkModeSubject.next(false);
    } else {
      this.createCookie(
        DarkModeCookie.NAME,
        DarkModeCookie.SET,
        DarkModeCookie.EXPIRES
      );
      this.isDarkModeSubject.next(true);
    }
  }

  public readDarkMode(): Observable<boolean> {
    return this.isDarkModeSubject.asObservable();
  }

  private createCookie(name: string, value: string, days: number): void {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  private readCookie(name: string): string | null {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}
