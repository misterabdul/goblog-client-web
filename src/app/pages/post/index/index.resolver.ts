import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Post } from 'src/app/types/post.type';
import { Response } from 'src/app/types/response.type';
import { PostService } from 'src/app/services/post.service';

@Injectable({
  providedIn: 'root',
})
export class PostIndexResolver implements Resolve<Post[] | null> {
  private _postService: PostService;

  private _tabObservable: (
    show?: number,
    page?: number
  ) => Observable<Response<Post[]>>;

  constructor(postService: PostService) {
    this._postService = postService;

    this._tabObservable = (show, page) =>
      this._postService.getPosts(show, page);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Post[] | null> {
    return this._tabObservable(
      route.queryParams.show ?? null,
      route.queryParams.page ?? null
    ).pipe(map((response) => response?.data ?? null));
  }
}
