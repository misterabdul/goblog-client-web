import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-page-post-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class PostShowPage {
  private _post: Post | undefined;

  constructor(activateRoute: ActivatedRoute, postService: PostService) {
    activateRoute.params.subscribe((params) => {
      if (typeof params['id'] === 'string')
        postService.getPost(params['id']).subscribe(
          (response) => {
            this._post = response;
          },
          (error) => {}
        );
    });
  }

  get post(): Post {
    return this._post!;
  }
}
