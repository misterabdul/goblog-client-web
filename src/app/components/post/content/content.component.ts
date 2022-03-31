import { Component, Input } from '@angular/core';

import { Post } from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class PostContentComponent {
  private _post: Post | null;

  constructor() {
    this._post = null;
  }

  @Input()
  set post(post: Post) {
    this._post = post;
  }
  get post(): Post {
    return this._post!;
  }
}
