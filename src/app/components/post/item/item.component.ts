import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import URL from 'src/app/configs/url.config';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class PostItemComponent {
  private _router: Router;
  private _post: Post | undefined;
  private _baseUrl: string = '.';

  constructor(router: Router) {
    this._router = router;
    this._baseUrl = URL.baseUrl;
  }

  public itemClick() {
    if (this._post && this._post.slug)
      this._router.navigateByUrl('/post/' + this._post.slug);
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
