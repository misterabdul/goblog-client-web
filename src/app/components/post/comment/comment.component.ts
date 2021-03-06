import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Comment, CommentFormData } from 'src/app/types/comment.type';
import { Post } from 'src/app/types/post.type';
import { ValidatorUtils } from 'src/app/utils/validator.util';

@Component({
  selector: 'app-component-post-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class PostCommentComponent implements OnInit {
  private _activatedRouteService: ActivatedRoute;

  private _isLoadingComment: boolean;
  private _post: Post | null;
  private _comments: Array<Comment>;
  private _isCreatingNewComment: boolean;
  private _formModel: FormModel;

  @Output()
  public ngCommentLoad: EventEmitter<void>;

  @Output()
  public ngNewCommentCreate: EventEmitter<CommentFormData>;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._isLoadingComment = false;
    this._post = null;
    this._comments = new Array<Comment>();
    this._isCreatingNewComment = false;
    this._formModel = new FormModel();

    this.ngCommentLoad = new EventEmitter<void>();
    this.ngNewCommentCreate = new EventEmitter<CommentFormData>();
  }

  ngOnInit(): void {
    this._post = this._activatedRouteService.snapshot.data.post;
  }

  public loadComment() {
    this.ngCommentLoad.emit();
  }

  public createNewComment() {
    this.ngNewCommentCreate.emit(
      this._formModel.getFormData(this._post?.uid ?? '')
    );
  }

  public clearForm() {
    this._formModel.emptyFormData();
  }

  @Input()
  set isLoadingComment(isLoadingComment: boolean) {
    this._isLoadingComment = isLoadingComment;
  }

  get isLoadingComment(): boolean {
    return this._isLoadingComment;
  }

  get post(): Post | null {
    return this._post;
  }

  get commentCount(): number {
    return this._post?.commentCount ?? 0;
  }

  @Input()
  set comments(comments: Array<Comment>) {
    this._comments = comments;
  }

  get comments(): Array<Comment> {
    return this._comments;
  }

  @Input()
  set isCreatingNewComment(isCreatingNewComment: boolean) {
    this._isCreatingNewComment = isCreatingNewComment;
    if (this.isCreatingNewComment) this._formModel.submitting();
    else this._formModel.submitDone();
  }

  get isCreatingNewComment(): boolean {
    return this._isCreatingNewComment;
  }

  get formModel(): FormModel {
    return this._formModel;
  }
}

class FormModel {
  public name: FormControl;
  public email: FormControl;
  public content: FormControl;

  constructor() {
    this.name = new FormControl(null, [
      Validators.required,
      ValidatorUtils.alnumSpace,
      Validators.maxLength(127),
    ]);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.content = new FormControl([], [Validators.maxLength(255)]);

    this.emptyFormData();
  }

  public emptyFormData() {
    this.name.reset();
    this.email.reset();
    this.content.reset();
  }

  public getFormData(postUid: string): CommentFormData {
    return new CommentFormData(
      postUid,
      this.email.value,
      this.name.value,
      this.content.value
    );
  }

  public submitting() {
    this.name.disable();
    this.email.disable();
    this.content.disable();
  }

  public submitDone() {
    this.name.enable();
    this.email.enable();
    this.content.enable();
  }
}
