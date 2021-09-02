import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layouts/layouts.module';

import { HomeIndexComponent } from './index/index.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeIndexComponent],
  imports: [CommonModule, LayoutModule, HomeRoutingModule],
})
export class HomeModule {}
