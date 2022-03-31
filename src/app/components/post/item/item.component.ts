import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { URL } from 'src/app/configs/url.config';
import { Post } from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class PostItemComponent {
  private _routerService: Router;

  private _post: Post | null;
  private _baseUrl: string;

  constructor(routerService: Router) {
    this._routerService = routerService;

    this._post = null;
    this._baseUrl = URL.baseUrl;
  }

  public itemClick() {
    if (this._post && this._post.slug)
      this._routerService.navigateByUrl('/post/' + this._post.slug);
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  @Input()
  set post(value: Post) {
    this._post = value;
  }

  get post(): Post {
    return this._post!;
  }

  get hasFeatureImage(): boolean {
    const featureImagePath = this._post?.featuringImagePath;
    return typeof featureImagePath === 'string' && featureImagePath.length > 0;
  }
}
