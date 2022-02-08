import { Time } from '@angular/common';

import { ResponseMessage } from './response.type';

export default class Post implements ResponseMessage {
  public uid: string | undefined;
  public slug: string | undefined;
  public title: string | undefined;
  public description: string | undefined;
  public featuringImagePath: string | undefined;
  public content: string | undefined;
  public categories: Array<PostCategory> | undefined;
  public tags: Array<String> | undefined;
  public author: PostAuthor | undefined;
  public publishedAt: Time | undefined;
  public commentCount: number | undefined;

  public message: string | undefined;
}

export class PostAuthor {
  public username: string | undefined;
  public email: string | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;
}

export class PostCategory {
  public name: string | undefined;
  public slug: string | undefined;
}
