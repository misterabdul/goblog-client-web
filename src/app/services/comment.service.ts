import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import HttpConfig from '../configs/http.config';
import URL from '../configs/url.config';
import { Comment, CommentFormData } from '../types/comment.type';
import Response from '../types/response.type';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _httpClientService: HttpClient;

  constructor(httpClientService: HttpClient) {
    this._httpClientService = httpClientService;
  }

  public getPostComments(postId: string): Observable<Response<Array<Comment>>> {
    return this._httpClientService.get<Response<Array<Comment>>>(
      URL.post + '/' + postId + '/comments',
      HttpConfig.getDefaultOptions()
    );
  }

  public createPostComment(
    formData: CommentFormData
  ): Observable<Response<Comment>> {
    return this._httpClientService.post<Response<Comment>>(
      URL.comment,
      formData,
      HttpConfig.getDefaultOptions()
    );
  }
}
