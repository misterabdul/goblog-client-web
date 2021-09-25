import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutDefaultComponent } from 'src/app/layouts/layouts.module';

import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'search',
    component: LayoutDefaultComponent,
    children: [
      { path: '', component: SearchComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
