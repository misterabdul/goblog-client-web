import { environment } from 'src/environments/environment';

export class URL {
  public static baseUrl = environment.apiUrl;
  public static posts = URL.baseUrl + '/api/v1/posts';
  public static searchPosts = URL.baseUrl + '/api/v1/post/search';
  public static post = URL.baseUrl + '/api/v1/post';
  public static comment = URL.baseUrl + '/api/v1/comment';
  public static pages = URL.baseUrl + '/api/v1/pages';
  public static page = URL.baseUrl + '/api/v1/page';
}
