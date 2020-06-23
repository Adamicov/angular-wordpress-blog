import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '@core/config';
import {Comment} from '@models/comment';
import {Id} from '@models/types';
import {Post} from '@models/post';

import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Page} from '@models/page';

@Injectable({ providedIn: 'root' })
export class PostApi {
  private readonly API_URL = `${config.apiUrl}/posts`;
  private readonly POST_NUMBER = config.POSTS_PER_PAGE;
  private readonly COMMENTS_NUMBER = config.COMMENTS_PER_PAGE;

  constructor(private http: HttpClient) {}

  getPosts(page = 1): Observable<Page<Post>> {
    const query = `/?number=${this.POST_NUMBER}&page=${page}`;
    const requestUri = this.API_URL + query;
    return this.http
      .get<any>(requestUri)
      .pipe(map((res) => new Page<Post>(Post.adaptList(res.posts), res.found)));
  }

  getPostBySlug(slug: string): Observable<Post> {
    const query = `/slug:${slug}`;
    const requestUri = this.API_URL + query;
    return this.http.get<any>(requestUri).pipe(map((post) => Post.adapt(post)), shareReplay(1));
  }

  getCommentsByPostId(postId: Id, page = 1): Observable<Page<Comment>> {
    const commentUri = `/${postId}/replies`;
    const query = `/?number=${this.COMMENTS_NUMBER}&page=${page}`;
    const requestUri = this.API_URL + commentUri + query;
    return this.http.get<any>(requestUri).pipe(
      map((res) => new Page<Comment>(Comment.adaptList(res.comments), res.found))
    );
  }
}
