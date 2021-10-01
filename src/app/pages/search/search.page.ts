import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DarkModeService } from 'src/app/services/darkmode.service';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-page-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  private _isDarkMode: boolean;
  private _posts: Array<Post>;
  private _isLoading: boolean;
  private _searchQuery: string | undefined;

  constructor(
    route: ActivatedRoute,
    darkModeService: DarkModeService,
    postService: PostService
  ) {
    this._isDarkMode = false;
    this._posts = new Array();
    this._isLoading = true;

    darkModeService.darkModeSubject.subscribe((isDarkMode) => {
      this._isDarkMode = isDarkMode;
    });

    route.queryParams.subscribe((params) => {
      this._searchQuery = params['q'];
      this._posts = new Array();
      this._isLoading = true;
      postService.searchPosts(this._searchQuery!).subscribe(
        (response) => {
          this._posts = response?.data ?? this._posts;
          this._isLoading = false;
        },
        (error) => {}
      );
    });
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  get posts(): Array<Post> {
    return this._posts;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get searchQuery(): string {
    return this._searchQuery!;
  }
}
