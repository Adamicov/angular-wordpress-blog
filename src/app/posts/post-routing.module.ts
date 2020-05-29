import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './containers/posts/posts.component';
import { PostDetailComponent } from './containers/post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: PostsComponent, pathMatch: 'full' },
      { path: ':slug', component: PostDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
