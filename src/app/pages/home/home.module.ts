import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layouts/layouts.module';

import { ComponentModule } from 'src/app/components/components.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeIndexComponent } from './index/index.component';
import { MarkdownSampleComponent } from './markdown-sample/markdown-sample.component';

@NgModule({
  declarations: [HomeIndexComponent, MarkdownSampleComponent],
  imports: [CommonModule, LayoutModule, ComponentModule, HomeRoutingModule],
})
export class HomeModule {}
