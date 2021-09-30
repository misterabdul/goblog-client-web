import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';

import { PostIndexPage } from './index/index.page';
import { PostShowPage } from './show/show.page';

const routes: Routes = [
  {
    path: 'post',
    component: DefaultLayout,
    children: [
      { path: '', component: PostIndexPage },
      { path: ':id', component: PostShowPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
