import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-page-post-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class PostShowPage implements AfterViewInit {
  private _post: Post | null;
  private _activatedRouteService: ActivatedRoute;
  private _postService;

  constructor(activateRoute: ActivatedRoute, postService: PostService) {
    this._post = null;

    this._activatedRouteService = activateRoute;
    this._postService = postService;
  }

  ngAfterViewInit(): void {
    this._activatedRouteService.params.subscribe((params) => {
      if (typeof params['id'] === 'string')
        this._postService.getPost(params['id']).subscribe(
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
