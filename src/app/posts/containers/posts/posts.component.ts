import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {config} from '@core/config';
import {UtilsService} from '@shared/utils.service';
import {Post} from '@models/post';
import {Page} from '@models/page';
import {Pagination} from '@models/pagination';

import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {PostApi} from '../../api/post.api';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  pagination = new Pagination(config.POSTS_PER_PAGE);
  paginationConfig: Partial<Pagination>;

  error = false;

  constructor(
    private route: ActivatedRoute,
    private api: PostApi,
    private utils: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.posts$ = this.route.queryParams.pipe(
      tap(() => this.loading$.next(true)),
      map((qParams) => qParams.page),
      map((pageNumber) => this.utils.validatePage(pageNumber)),
      tap((pageNumber) => this.pagination.setCurrentPage(pageNumber)),
      switchMap((pageNumber) => this.api.getPosts(pageNumber)),
      switchMap((pagedRes) => this.setPagination(pagedRes)),
      catchError((err) => this.handleError(err)),
      tap(() => this.loading$.next(false)),
    );
  }

  setPagination(page: Page<Post>): Observable<any> {
    const pagesAvailable = page.itemsCount / this.pagination.itemsPerPage;
    if (pagesAvailable < this.pagination.getCurrentPage()) {
      return throwError('PAGE_NOT_EXIST');
    } else {
      this.pagination.setTotalItems(page.itemsCount);
      this.paginationConfig = this.pagination.getConfig();
      return of(page.items);
    }
  }

  handleError(error) {
    this.error = true;
    return of([]);
  }

  pageChanges(page: number) {
    this.router.navigate([], { queryParams: { page } });
  }

  onClick(post: Post) {
    this.router.navigate(['posts', post.slug]);
  }
}
