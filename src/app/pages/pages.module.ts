import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './pages-routing.module';
import { HomeModule } from './home/home.module';
import { PostModule } from './post/post.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, PageRoutingModule, HomeModule, PostModule],
})
export class PageModule {}
