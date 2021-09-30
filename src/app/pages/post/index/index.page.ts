import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-page-post-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class PostIndexPage {
  private _posts: Array<Post>;
  private _isLoading: boolean;

  constructor(postService: PostService) {
    this._posts = new Array();
    this._isLoading = true;

    postService.getPosts().subscribe(
      (response) => {
        this._posts = response?.data ?? this._posts;
        this._isLoading = false;
      },
      (error) => {}
    );
  }

  get posts(): Array<Post> {
    return this._posts;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }
}
