import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SharedHeaderComponent implements AfterViewInit {
  private _activatedRouteServcie: ActivatedRoute;
  private _routerService: Router;
  private _darkModeService: DarkModeService;

  private _navItems: Array<Menu>;
  private _isDarkMode: boolean;
  private _searchQuery: string | null;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    darkModeService: DarkModeService
  ) {
    this._activatedRouteServcie = activatedRouteService;
    this._routerService = routerService;
    this._darkModeService = darkModeService;

    this._navItems = [new Menu('Posts', '/post')];
    this._isDarkMode = false;
    this._searchQuery = null;
  }

  ngAfterViewInit(): void {
    this._activatedRouteServcie.queryParams.subscribe({
      next: (params) => {
        this._searchQuery = params['q'] ?? null;
      },
    });

    this._darkModeService.darkModeSubject.subscribe({
      next: (isDarkMode: boolean) => {
        this._isDarkMode = isDarkMode;
      },
    });
  }

  get navItems(): Array<Menu> {
    return this._navItems;
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  get searchQuery(): string | null {
    return this._searchQuery;
  }

  set searchQuery(searchQuery: string | null) {
    this._searchQuery = searchQuery;
  }

  public doSearch() {
    this._routerService.navigateByUrl('/search?q=' + this._searchQuery);
  }

  public toggleDarkMode() {
    this._darkModeService.toggleDarkMode();
  }
}

class Menu {
  constructor(public label: string, public link: string) {}
}
