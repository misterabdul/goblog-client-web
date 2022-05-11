import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';

import { PostIndexPage } from './index/index.page';
import { PostIndexResolver } from './index/index.resolver';
import { PostShowPage } from './show/show.page';
import { PostShowResolver } from './show/show.resolver';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: PostIndexPage,
        resolve: { posts: PostIndexResolver },
      },
      {
        path: ':uid',
        component: PostShowPage,
        resolve: { post: PostShowResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
