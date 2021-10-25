import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-page-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  private _posts: Array<Post>;
  private _isLoading: boolean;
  private _searchQuery: string | undefined;

  constructor(route: ActivatedRoute, postService: PostService) {
    this._posts = new Array();
    this._isLoading = true;

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
