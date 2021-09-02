import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { LayoutDefaultComponent } from './default/default.component';
import { ComponentModule } from '../components/components.module';

@NgModule({
  declarations: [LayoutDefaultComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    ComponentModule,
  ],
})
export class LayoutModule {}

export { LayoutDefaultComponent };
