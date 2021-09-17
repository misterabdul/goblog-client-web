import { environment } from 'src/environments/environment';

export default class URL {
  public static baseUrl = environment.apiUrl;
  public static posts = URL.baseUrl + '/api/v1/posts';
  public static post = URL.baseUrl + '/api/v1/post';
}
