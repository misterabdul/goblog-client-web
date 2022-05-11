import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { CustomPage } from './custom/custom.page';
import { CustomPageResolver } from './custom/custom.resolver';

const routes: Routes = [
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: CustomPage,
        resolve: { page: CustomPageResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
