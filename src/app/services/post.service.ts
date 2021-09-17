import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import URL from '../configs/url.config';
import Response from '../types/response.type';
import Post from '../types/post.type';
import HttpConfig from '../configs/http.config';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private _http: HttpClient) {}

  public getPosts() {
    return this._http.get<Response<Array<Post>>>(
      URL.posts,
      HttpConfig.getDefaultOptions()
    );
  }

  public getPost(id: string) {
    return this._http.get<Post>(
      URL.post + '/' + id,
      HttpConfig.getDefaultOptions()
    );
  }
}
