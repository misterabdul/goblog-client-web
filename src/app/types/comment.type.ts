import { Time } from '@angular/common';
import { ResponseMessage } from './response.type';

export class Comment {
  public uid: string | undefined;
  public postUid: string | undefined;
  public parentCommentUid: string | undefined;
  public email: string | undefined;
  public name: string | undefined;
  public content: string | undefined;
  public replyCount: number | undefined;
  public createdAt: Time | undefined;
}

export class CommentFormData {
  public postUid: string;
  public email: string;
  public name: string;
  public content: string;

  constructor(postUid: string, email: string, name: string, content: string) {
    this.postUid = postUid;
    this.email = email;
    this.name = name;
    this.content = content;
  }
}
