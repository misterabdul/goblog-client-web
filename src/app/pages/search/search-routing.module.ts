import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { SearchPage } from './search/search.page';
import { SearchResolver } from './search/search.resolver';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: SearchPage,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: { posts: SearchResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
