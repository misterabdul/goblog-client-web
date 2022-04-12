import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { PageService } from 'src/app/services/page.service';
import { Page } from 'src/app/types/page.type';

@Component({
  selector: 'app-page-custom',
  templateUrl: './custom.page.html',
  styleUrls: ['./custom.page.scss'],
})
export class CustomPage implements AfterViewInit {
  private _routerService: Router;
  private _snackBarService: MatSnackBar;
  private _pageService: PageService;

  private _isLoading: boolean;
  private _page: Page | null;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    pageService: PageService
  ) {
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._pageService = pageService;

    this._isLoading = true;
    this._page = null;
  }

  private cleanUrl(url: string): string {
    return url.replace(/^\//g, '');
  }

  ngAfterViewInit(): void {
    const cleanUrl = this.cleanUrl(this._routerService.url);

    this._pageService
      .getPageBySlug(cleanUrl)
      .pipe(
        finalize(() => {
          this._isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this._page = response.data ?? null;
        },
        error: (error) => {
          this._page = null;
          if (error instanceof HttpErrorResponse && error.status !== 404) {
            this._snackBarService.open(
              'Failed to fetch page.\n' +
                (error.error?.message ?? 'Unknown error.'),
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          }
        },
      });
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get page(): Page | null {
    return this._page;
  }
}
