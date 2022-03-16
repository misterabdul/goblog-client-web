import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatMap, finalize } from 'rxjs/operators';

import { PostCommentComponent } from 'src/app/components/components.module';
import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/types/post.type';
import { Comment, CommentFormData } from 'src/app/types/comment.type';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-page-post-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class PostShowPage implements AfterViewInit {
  private _activatedRouteService: ActivatedRoute;
  private _snackBarService: MatSnackBar;
  private _postService: PostService;
  private _commentService: CommentService;

  @ViewChild('comment')
  private _commentComponent!: PostCommentComponent;
  private _post: Post | null;
  private _postParam: string | null;
  private _isLoadingComment: boolean;
  private _isCreatingNewComment: boolean;
  private _comments: Array<Comment>;

  constructor(
    activatedRouteService: ActivatedRoute,
    snackBarService: MatSnackBar,
    postService: PostService,
    commentService: CommentService
  ) {
    this._activatedRouteService = activatedRouteService;
    this._snackBarService = snackBarService;
    this._postService = postService;
    this._commentService = commentService;

    this._post = null;
    this._postParam = null;
    this._isLoadingComment = false;
    this._isCreatingNewComment = false;
    this._comments = new Array<Comment>();
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
      .subscribe({
        next: (response) => {
          this._post = response.data ?? null;
        },
        error: (error) => {
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
        },
      });
  }

  public loadComment() {
    this._isLoadingComment = true;
    this._commentService
      .getPostComments(this._post!.uid!)
      .pipe(
        finalize(() => {
          this._isLoadingComment = false;
        })
      )
      .subscribe({
        next: (response) => {
          this._comments = response.data!;
        },
        error: (error) => {
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
        },
      });
  }

  public createNewComment(formData: CommentFormData) {
    this._isCreatingNewComment = true;
    this._commentService
      .createPostComment(formData)
      .pipe(
        finalize(() => {
          this._isCreatingNewComment = false;
        })
      )
      .subscribe({
        next: (response) => {
          this._comments.push(response.data!);
          this._commentComponent.clearForm();
        },
        error: (error) => {
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
        },
      });
  }

  get post(): Post {
    return this._post!;
  }

  get isLoadingComment(): boolean {
    return this._isLoadingComment;
  }

  get isCreatingNewComment() {
    return this._isCreatingNewComment;
  }

  get comments(): Array<Comment> {
    return this._comments;
  }
}
