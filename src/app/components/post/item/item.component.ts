import { Component, Input, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class PostItemComponent {
  private _isDarkMode: boolean = false;
  private _post: Post | undefined;

  constructor(darkModeService: DarkModeService) {
    darkModeService.darkModeSubject.subscribe((isDarkMode) => {
      this._isDarkMode = isDarkMode;
    });
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
}
