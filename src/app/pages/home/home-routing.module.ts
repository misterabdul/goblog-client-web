import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutDefaultComponent } from 'src/app/layouts/layouts.module';

import { HomeIndexComponent } from './index/index.component';
import { MarkdownSampleComponent } from './markdown-sample/markdown-sample.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [{ path: '', component: HomeIndexComponent }],
  },
  {
    path: 'home',
    component: LayoutDefaultComponent,
    children: [
      { path: '', component: HomeIndexComponent },
      { path: 'markdown-sample', component: MarkdownSampleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
