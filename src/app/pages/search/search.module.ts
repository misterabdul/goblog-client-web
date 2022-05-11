import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layouts/layouts.module';

import { ComponentModule } from 'src/app/components/components.module';
import { SearchRoutingModule } from './search-routing.module';

import { SearchPage } from './search/search.page';

@NgModule({
  declarations: [SearchPage],
  imports: [CommonModule, LayoutModule, ComponentModule, SearchRoutingModule],
})
export class SearchModule {}
