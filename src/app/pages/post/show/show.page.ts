import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

import { PostCommentComponent } from 'src/app/components/components.module';
import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { CommentService } from 'src/app/services/comment.service';
import { Comment, CommentFormData } from 'src/app/types/comment.type';

@Component({
  selector: 'app-page-post-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class PostShowPage implements OnInit {
  private _activatedRouteService: ActivatedRoute;
  private _snackBarService: MatSnackBar;
  private _commentService: CommentService;

  @ViewChild('comment')
  private _commentComponent!: PostCommentComponent;

  private _postUid: string | null;
  private _isLoadingComment: boolean;
  private _isCreatingNewComment: boolean;
  private _comments: Array<Comment>;

  constructor(
    activatedRouteService: ActivatedRoute,
    snackBarService: MatSnackBar,
    commentService: CommentService
  ) {
    this._activatedRouteService = activatedRouteService;
    this._snackBarService = snackBarService;
    this._commentService = commentService;

    this._postUid = null;
    this._isLoadingComment = false;
    this._isCreatingNewComment = false;
    this._comments = new Array<Comment>();
  }

  ngOnInit(): void {
    this._postUid = this._activatedRouteService.snapshot.params['uid'] ?? null;
  }

  public loadComment() {
    this._isLoadingComment = true;
    this._commentService
      .getPostComments(this._postUid ?? '')
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
              'Failed to fetch comments.\n' +
                (error.error?.message ?? 'Unknown error.'),
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          } else {
            this._snackBarService.open(
              'Failed to fetch comments.\nUnknown error.',
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
