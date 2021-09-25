import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-page-post-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class PostIndexComponent {
  private _posts: Array<Post>;

  constructor(postService: PostService) {
    this._posts = new Array();

    postService.getPosts().subscribe((response) => {
      this._posts = response?.data ?? this._posts;
    });
  }

  get posts(): Array<Post> {
    return this._posts;
  }
}
