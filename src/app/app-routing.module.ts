import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)},
  {path: '', pathMatch: 'full', redirectTo: 'posts'},
  {path: '**', redirectTo: 'posts'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
