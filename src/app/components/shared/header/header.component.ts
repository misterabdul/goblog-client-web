import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SharedHeaderComponent implements AfterViewInit {
  private _activatedRouteServcie: ActivatedRoute;
  private _routerService: Router;
  private _snackBarService: MatSnackBar;
  private _darkModeService: DarkModeService;

  private _navItems: Array<Menu>;
  private _isDarkMode: boolean;
  private _searchQuery: string | null;
  private _isLoading: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    snackBarService: MatSnackBar,
    darkModeService: DarkModeService
  ) {
    this._activatedRouteServcie = activatedRouteService;
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._darkModeService = darkModeService;

    this._navItems = [new Menu('Posts', '/post')];
    this._isDarkMode = false as boolean;
    this._searchQuery = null;
    this._isLoading = false as boolean;
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

    this._routerService.events.subscribe({
      next: (event) => {
        switch (true) {
          case event instanceof NavigationStart:
            this._isLoading = true;
            break;
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
            this._isLoading = false;
            break;
          case event instanceof NavigationError:
            if (
              event instanceof NavigationError &&
              event.error instanceof HttpErrorResponse
            ) {
              this._snackBarService.open(
                'Failed to fetch data.\n' +
                  (event.error.error?.message ?? 'Unknown error.'),
                undefined,
                {
                  duration: SnackBarConfig.ERROR_DURATIONS,
                }
              );
            } else {
              this._snackBarService.open(
                'Failed to fetch data.\nUnknown error.',
                undefined,
                {
                  duration: SnackBarConfig.ERROR_DURATIONS,
                }
              );
            }
            this._isLoading = false;
            break;
          default:
            break;
        }
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

  get isLoading(): boolean {
    return this._isLoading;
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
