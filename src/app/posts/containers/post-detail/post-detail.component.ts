import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@models/post';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { PostApi } from '../../api/post.api';
import { Comment } from '@models/comment';
import { Pagination } from '@models/pagination';
import { config } from '@core/config';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post$: Observable<Post>;
  comments$: Observable<Comment[]>;

  postLoader$ = new BehaviorSubject(false);
  commentsLoader$ = new BehaviorSubject(false);

  pagination: Pagination = new Pagination(config.COMMENTS_PER_PAGE);
  paginationConfig: Partial<Pagination>;

  error = false;

  constructor(private route: ActivatedRoute, private api: PostApi) {}

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      tap(() => this.postLoader$.next(true)),
      map((params) => params.slug),
      switchMap((slug) => this.getPost(slug)),
      tap(() => this.postLoader$.next(false)),
      filter((post) => !!post)
    );

    this.comments$ = this.post$.pipe(
      tap(() => this.commentsLoader$.next(true)),
      mergeMap((post) => this.getComments(post)),
      tap(() => this.commentsLoader$.next(false))
    );
  }

  getPost(slug: string): Observable<Post> {
    return this.api
      .getPostBySlug(slug)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getComments(post: Post): Observable<Comment[]> {
    return this.api.getCommentsByPostId(post.id);
  }

  handleError(error) {
    this.error = true;
    return of(null);
  }

  pageChanges(page: number) {}
}
