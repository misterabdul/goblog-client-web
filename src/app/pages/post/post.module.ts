import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layouts/layouts.module';

import { ComponentModule } from 'src/app/components/components.module';
import { PostRoutingModule } from './post-routing.module';
import { PostIndexComponent } from './index/index.component';

@NgModule({
  declarations: [PostIndexComponent],
  imports: [CommonModule, LayoutModule, ComponentModule, PostRoutingModule],
})
export class PostModule {}
