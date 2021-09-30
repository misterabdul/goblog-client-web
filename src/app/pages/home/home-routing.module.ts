import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';

import { HomeIndexPage } from './index/index.page';
import { MarkdownSamplePage } from './markdown-sample/markdown-sample.page';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    children: [{ path: '', component: HomeIndexPage }],
  },
  {
    path: 'home',
    component: DefaultLayout,
    children: [
      { path: '', component: MarkdownSamplePage },
      { path: 'markdown-sample', component: MarkdownSamplePage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
