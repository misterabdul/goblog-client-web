import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { PostModule } from './post/post.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeModule, PostModule],
})
export class PageModule {}
