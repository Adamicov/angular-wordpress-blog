import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { HttpPostApiService } from '../../api/http-post.api-service';
import { Observable, of } from 'rxjs';
import { Page } from '../../../domain/page';
import { Post } from '../../../domain/post';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilsService } from '@shared/utils.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';

const POST_API_STUB: Post = {
  id: '2169e656-3083-4d64-926d-d007dd7ce669',
  content: 'Content',
  date: new Date(),
  excerpt: '<html></html>',
  slug: 'slug',
  title: 'Title',
  thumbnail: 'thumbnail.url',
  author: {
    name: 'John Doe',
    avatarUrl: 'avatar.url',
  },
};

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [NgxPaginationModule, NgxLoadingModule],
      providers: [
        {
          provide: HttpPostApiService,
          useValue: {
            getPosts(page): Observable<Page<Post>> {
              return of({
                items: [POST_API_STUB],
                itemsCount: 1,
              });
            },
          } as HttpPostApiService,
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
        UtilsService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ page: 1 } as Params),
          } as Partial<ActivatedRoute>,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
