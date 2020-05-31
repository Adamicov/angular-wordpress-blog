import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostsComponent } from './containers/posts/posts.component';
import { PostDetailComponent } from './containers/post-detail/post-detail.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { PostRoutingModule } from './post-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { AuthorComponent } from './components/author/author.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostDetailComponent,
    PostComponent,
    CommentComponent,
    AuthorComponent,
  ],
  imports: [
    SharedModule,
    PostRoutingModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({ fullScreenBackdrop: true }),
  ],
  exports: [PostRoutingModule],
})
export class PostsModule {}
