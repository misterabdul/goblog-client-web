import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-page-post-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class PostIndexPage implements AfterViewInit {
  private _postService: PostService;
  private _snackBarService: MatSnackBar;

  private _posts: Array<Post>;
  private _isLoading: boolean;

  constructor(snackBarService: MatSnackBar, postService: PostService) {
    this._snackBarService = snackBarService;
    this._postService = postService;

    this._posts = new Array();
    this._isLoading = true;
  }

  ngAfterViewInit(): void {
    this._postService
      .getPosts()
      .pipe(
        finalize(() => {
          this._isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this._posts = response?.data ?? this._posts;
        },
        error: (error) => {
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
}
