import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URL } from '../configs/url.config';
import { HttpConfig } from '../configs/http.config';
import { Response } from '../types/response.type';
import { Post } from '../types/post.type';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private _http: HttpClient) {}

  public getPosts(
    show?: number,
    page?: number
  ): Observable<Response<Array<Post>>> {
    return this._http.get<Response<Array<Post>>>(
      URL.posts,
      HttpConfig.getDefaultOptions()
    );
  }

  public searchPosts(query: string): Observable<Response<Array<Post>>> {
    return this._http.get<Response<Array<Post>>>(
      URL.searchPosts + '?q=' + query,
      HttpConfig.getDefaultOptions()
    );
  }

  public getPost(id: string): Observable<Response<Post>> {
    return this._http.get<Response<Post>>(
      URL.post + '/' + id,
      HttpConfig.getDefaultOptions()
    );
  }
}
