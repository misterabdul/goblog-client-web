import { AfterViewInit, Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-page-post-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class PostIndexPage implements AfterViewInit {
  private _posts: Array<Post>;
  private _isLoading: boolean;
  private _postService: PostService;

  constructor(postService: PostService) {
    this._posts = new Array();
    this._isLoading = true;

    this._postService = postService;
  }

  ngAfterViewInit(): void {
    this._postService
      .getPosts()
      .pipe(
        finalize(() => {
          this._isLoading = false;
        })
      )
      .subscribe(
        (response) => {
          this._posts = response?.data ?? this._posts;
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
