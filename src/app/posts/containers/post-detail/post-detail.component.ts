import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Post } from '../../../domain/post';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { HttpPostApiService } from '../../api/http-post.api-service';
import { Comment } from '../../../domain/comment';
import { Pagination } from '../../../domain/pagination';
import { config } from '@core/config';
import { Page } from '../../../domain/page';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent implements OnInit {
  post$: Observable<Post>;
  comments$: Observable<Comment[]>;

  postLoader$ = new BehaviorSubject(false);
  commentsLoader$ = new BehaviorSubject(false);

  pagination: Pagination = new Pagination(config.COMMENTS_PER_PAGE);
  paginationConfig: Partial<Pagination>;

  commentsAmount: number;
  error = false;

  constructor(private route: ActivatedRoute, private api: HttpPostApiService) {}

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      tap(() => this.postLoader$.next(true)),
      map((params) => params.slug),
      switchMap((slug) => this.getPost(slug)),
      tap(() => this.postLoader$.next(false)),
      filter((post) => !!post)
    );

    this.fetchComments();
  }

  getPost(slug: string): Observable<Post> {
    return this.api
      .getPostBySlug(slug)
      .pipe(catchError((err) => this.handleError(err)));
  }

  handleError(error) {
    this.error = true;
    return of(null);
  }

  fetchComments(): void {
    const currentPage = this.pagination.getCurrentPage();
    this.comments$ = this.post$.pipe(
      tap(() => this.commentsLoader$.next(true)),
      map((post) => post.id),
      mergeMap((id) => this.api.getCommentsByPostId(id, currentPage)),
      switchMap((page) => this.setPagination(page)),
      tap(() => this.commentsLoader$.next(false))
    );
  }

  setPagination(page: Page<Comment>): Observable<Comment[]> {
    this.commentsAmount = page.itemsCount;
    this.pagination.setTotalItems(page.itemsCount);
    if (!this.pagination.getCurrentPage()) {
      this.pagination.setCurrentPage(1);
    }
    this.paginationConfig = this.pagination.getConfig();
    return of(page.items);
  }

  pageChanges(page: number) {
    this.pagination.setCurrentPage(page);
    this.paginationConfig = this.pagination.getConfig();
    this.fetchComments();
  }
}
