import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutDefaultComponent } from 'src/app/layouts/layouts.module';

import { PostIndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: 'post',
    component: LayoutDefaultComponent,
    children: [{ path: '', component: PostIndexComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
