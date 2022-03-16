import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatMap } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-page-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements AfterViewInit {
  private _activatedRouteService: ActivatedRoute;
  private _snackBarService: MatSnackBar;
  private _postService: PostService;
  private _posts: Array<Post>;
  private _searchQuery: string | null;
  private _isLoading: boolean;

  constructor(
    activatedRoute: ActivatedRoute,
    snackBarService: MatSnackBar,
    postService: PostService
  ) {
    this._activatedRouteService = activatedRoute;
    this._snackBarService = snackBarService;
    this._postService = postService;

    this._posts = new Array();
    this._searchQuery = null;
    this._isLoading = true;
  }

  ngAfterViewInit(): void {
    this._activatedRouteService.queryParams
      .pipe(
        concatMap((params) => {
          this._isLoading = true;
          this._posts = new Array();
          if (typeof params['q'] === 'string') this._searchQuery = params['q'];
          else this._searchQuery = null;

          return this._postService.searchPosts(this._searchQuery!);
        })
      )
      .subscribe({
        next: (response) => {
          this._posts = response?.data ?? this._posts;
          this._isLoading = false;
        },
        error: (error) => {
          this._isLoading = false;
          if (error instanceof HttpErrorResponse) {
            this._snackBarService.open(
              'Failed to fetch posts.\n' +
                (error.error?.message ?? 'Unknown error.'),
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          } else {
            this._snackBarService.open(
              'Failed to fetch posts.\nUnknown error.',
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          }
        },
      });
  }

  get posts(): Array<Post> {
    return this._posts;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get searchQuery(): string {
    return this._searchQuery!;
  }
}
