import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentModule } from '../components/components.module';
import { PageRoutingModule } from './pages-routing.module';
import { HomeModule } from './home/home.module';
import { CustomPage } from './custom/custom.page';

@NgModule({
  declarations: [CustomPage],
  imports: [CommonModule, ComponentModule, HomeModule, PageRoutingModule],
})
export class PageModule {}
