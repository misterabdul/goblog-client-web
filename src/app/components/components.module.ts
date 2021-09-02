import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SharedHeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [SharedHeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [SharedHeaderComponent],
})
export class ComponentModule {}

export { SharedHeaderComponent };
