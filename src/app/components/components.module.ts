import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from '@misterabdul/ngx-markdown';

import { SharedHeaderComponent } from './shared/header/header.component';
import { SharedContentMarkdownComponent } from './shared/content-markdown/content-markdown.component';

@NgModule({
  declarations: [SharedHeaderComponent, SharedContentMarkdownComponent],
  imports: [
    CommonModule,
    MarkdownModule.forChild(),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [SharedHeaderComponent, SharedContentMarkdownComponent],
})
export class ComponentModule {}

export { SharedHeaderComponent, SharedContentMarkdownComponent };
