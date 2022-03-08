import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

type HttpOptions = {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
};

export default class HttpConfig {
  public static getDefaultOptions(
    headers: HttpHeaders | null = null
  ): HttpOptions {
    let _headers = headers ?? new HttpHeaders();
    _headers = _headers.append('Accept', 'application/msgpack');

    return {
      headers: _headers,
    };
  }
}
