import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatMap } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-page-post-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class PostShowPage implements AfterViewInit {
  private _activatedRouteService: ActivatedRoute;
  private _snackBarService: MatSnackBar;
  private _postService: PostService;
  private _post: Post | null;
  private _postParam: string | null;

  constructor(
    activatedRouteService: ActivatedRoute,
    snackBarService: MatSnackBar,
    postService: PostService
  ) {
    this._activatedRouteService = activatedRouteService;
    this._snackBarService = snackBarService;
    this._postService = postService;

    this._post = null;
    this._postParam = null;
  }

  ngAfterViewInit(): void {
    this._activatedRouteService.params
      .pipe(
        concatMap((params) => {
          if (typeof params['id'] === 'string') this._postParam = params['id'];
          else this._postParam = null;

          return this._postService.getPost(this._postParam!);
        })
      )
      .subscribe(
        (response) => {
          this._post = response;
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            this._snackBarService.open(
              'Failed to fetch post.\n' +
                (error.error?.message ?? 'Unknown error.'),
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          } else {
            this._snackBarService.open(
              'Failed to fetch post.\nUnknown error.',
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          }
        }
      );
  }

  get post(): Post {
    return this._post!;
  }
}
