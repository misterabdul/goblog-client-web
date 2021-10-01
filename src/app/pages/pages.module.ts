import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentModule } from '../components/components.module';
import { PageRoutingModule } from './pages-routing.module';
import { HomeModule } from './home/home.module';
import { PostModule } from './post/post.module';
import { SearchPage } from './search/search.page';
import { NotFoundPage } from './notfound/notfound.page';

@NgModule({
  declarations: [SearchPage, NotFoundPage],
  imports: [
    CommonModule,
    ComponentModule,
    HomeModule,
    PostModule,
    PageRoutingModule,
  ],
})
export class PageModule {}
