import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutDefaultComponent } from 'src/app/layouts/layouts.module';

import { PostIndexComponent } from './index/index.component';
import { PostShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path: 'post',
    component: LayoutDefaultComponent,
    children: [
      { path: '', component: PostIndexComponent },
      { path: ':id', component: PostShowComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
