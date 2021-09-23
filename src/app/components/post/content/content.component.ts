import { Component, Input } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class PostContentComponent {
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
  set post(post: Post) {
    this._post = post;
  }
  get post(): Post {
    return this._post!;
  }
}
