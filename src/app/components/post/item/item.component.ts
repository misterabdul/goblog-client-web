import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import URL from 'src/app/configs/url.config';
import { DarkModeService } from 'src/app/services/darkmode.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class PostItemComponent {
  private _router: Router;
  private _isDarkMode: boolean = false;
  private _post: Post | undefined;
  private _baseUrl: string = '.';

  constructor(router: Router, darkModeService: DarkModeService) {
    this._router = router;
    this._baseUrl = URL.baseUrl;

    darkModeService.darkModeSubject.subscribe((isDarkMode) => {
      this._isDarkMode = isDarkMode;
    });
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  @Input()
  set post(value: Post) {
    this._post = value;
  }
  get post(): Post {
    return this._post!;
  }

  public itemClick() {
    if (this._post && this._post.slug)
      this._router.navigateByUrl('/post/' + this._post.slug);
  }
}
