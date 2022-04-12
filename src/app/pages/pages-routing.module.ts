import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { CustomPage } from './custom/custom.page';

import { SearchPage } from './search/search.page';

const routes: Routes = [
  {
    path: 'search',
    component: DefaultLayout,
    children: [{ path: '', component: SearchPage }],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: DefaultLayout,
    children: [{ path: '', component: CustomPage }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
