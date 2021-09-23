import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class PostShowComponent {
  private _post: Post | undefined;

  constructor(activateRoute: ActivatedRoute, postService: PostService) {
    activateRoute.params.subscribe((params) => {
      if (typeof params['id'] === 'string')
        postService.getPost(params['id']).subscribe((response) => {
          this._post = response;
        });
    });
  }

  get post(): Post {
    return this._post!;
  }
}