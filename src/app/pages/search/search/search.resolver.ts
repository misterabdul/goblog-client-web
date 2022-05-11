import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Post } from 'src/app/types/post.type';
import { PostService } from 'src/app/services/post.service';

@Injectable({
  providedIn: 'root',
})
export class SearchResolver implements Resolve<Post[] | null> {
  private _postService: PostService;

  constructor(postService: PostService) {
    this._postService = postService;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Post[] | null> {
    return this._postService
      .searchPosts(route.queryParams.q ?? '')
      .pipe(map((response) => response?.data ?? null));
  }
}
