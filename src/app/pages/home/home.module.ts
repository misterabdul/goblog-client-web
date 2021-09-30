import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layouts/layouts.module';

import { ComponentModule } from 'src/app/components/components.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeIndexPage } from './index/index.page';
import { MarkdownSamplePage } from './markdown-sample/markdown-sample.page';

@NgModule({
  declarations: [HomeIndexPage, MarkdownSamplePage],
  imports: [CommonModule, LayoutModule, ComponentModule, HomeRoutingModule],
})
export class HomeModule {}
